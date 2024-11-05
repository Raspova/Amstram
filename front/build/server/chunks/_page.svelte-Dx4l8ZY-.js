import { c as create_ssr_component, v as validate_component, d as add_attribute, f as compute_rest_props, h as spread, i as escape_attribute_value, j as escape_object, k as each } from './ssr-Bbz_70xU.js';
import 'aos';

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const CLASS_PART_SEPARATOR = '-';
const createClassGroupUtils = config => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = className => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = className => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
};
/**
 * Exported for testing only
 */
const createClassMap = config => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = func => func.isThemeGetter;
const getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map(classDefinition => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
const createLruCache = maxCacheSize => {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = '!';
const createParseClassName = config => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  // parseClassName inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  const parseClassName = className => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return className => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
const sortModifiers = modifiers => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach(modifier => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
const createConfigUtils = config => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      // Tailwind class omitted due to conflict
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    // Tailwind class not in conflict
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = mix => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = key => {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isLength = value => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
const isArbitraryLength = value => getIsArbitraryValue(value, 'length', isLengthOnly);
const isNumber = value => Boolean(value) && !Number.isNaN(Number(value));
const isArbitraryNumber = value => getIsArbitraryValue(value, 'number', isNumber);
const isInteger = value => Boolean(value) && Number.isInteger(Number(value));
const isPercent = value => value.endsWith('%') && isNumber(value.slice(0, -1));
const isArbitraryValue = value => arbitraryValueRegex.test(value);
const isTshirtSize = value => tshirtUnitRegex.test(value);
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
const isArbitrarySize = value => getIsArbitraryValue(value, sizeLabels, isNever);
const isArbitraryPosition = value => getIsArbitraryValue(value, 'position', isNever);
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
const isArbitraryImage = value => getIsArbitraryValue(value, imageLabels, isImage);
const isArbitraryShadow = value => getIsArbitraryValue(value, '', isShadow);
const isAny = () => true;
const getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const isLengthOnly = value =>
// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
// For example, `hsl(0 0% 0%)` would be classified as a length without this check.
// I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = value => shadowRegex.test(value);
const isImage = value => imageRegex.test(value);
const getDefaultConfig = () => {
  const colors = fromTheme('colors');
  const spacing = fromTheme('spacing');
  const blur = fromTheme('blur');
  const brightness = fromTheme('brightness');
  const borderColor = fromTheme('borderColor');
  const borderRadius = fromTheme('borderRadius');
  const borderSpacing = fromTheme('borderSpacing');
  const borderWidth = fromTheme('borderWidth');
  const contrast = fromTheme('contrast');
  const grayscale = fromTheme('grayscale');
  const hueRotate = fromTheme('hueRotate');
  const invert = fromTheme('invert');
  const gap = fromTheme('gap');
  const gradientColorStops = fromTheme('gradientColorStops');
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  const inset = fromTheme('inset');
  const margin = fromTheme('margin');
  const opacity = fromTheme('opacity');
  const padding = fromTheme('padding');
  const saturate = fromTheme('saturate');
  const scale = fromTheme('scale');
  const sepia = fromTheme('sepia');
  const skew = fromTheme('skew');
  const space = fromTheme('space');
  const translate = fromTheme('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue];
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal', ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...getAlign(), 'baseline']
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [...getAlign(), 'baseline']
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [isArbitraryValue, spacing, 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...getLineStyles(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...getLineStyles(), 'hidden']
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-s': [{
        'border-s': [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-e': [{
        'border-e': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: ['', ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-s', 'border-color-e', 'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
};
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
/**
 * @license lucide-svelte v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name = void 0 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode = [] } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0) $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0) $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Log_in = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
      }
    ],
    ["polyline", { "points": "10 17 15 12 10 7" }],
    [
      "line",
      {
        "x1": "15",
        "x2": "3",
        "y1": "12",
        "y2": "12"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "log-in" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Map_pin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["circle", { "cx": "12", "cy": "10", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "map-pin" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("bg-card text-card-foreground rounded-lg border shadow-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6 pb-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn("text-lg font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = 200 } = $$props;
  let { height = 100 } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" class="w-2/3 md:w-full"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="0 0 1500 450"><g transform="matrix(1,0,0,1,-0.9090909090907644,-1.6220170740343463)"><svg viewBox="0 0 396 119" data-background-color="#000000" preserveAspectRatio="xMidYMid meet" height="450" width="1500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="tight-bounds" transform="matrix(1,0,0,1,0.23999999999995225,0.4289334040224162)"><svg viewBox="0 0 395.52 118.14213319195514" height="118.14213319195514" width="395.52"><g><svg viewBox="0 0 593.3663326295468 177.2389874118676" height="118.14213319195514" width="395.52"><g transform="matrix(1,0,0,1,0,24.49540274650269)"><svg viewBox="0 0 395.52 128.24818191886223" height="128.24818191886223" width="395.52"><g id="textblocktransform"><svg viewBox="0 0 395.52 128.24818191886223" height="128.24818191886223" width="395.52" id="textblock"><g><svg viewBox="0 0 395.52 87.29114868804665" height="87.29114868804665" width="395.52"><g transform="matrix(1,0,0,1,0,0)"><svg width="395.52" viewBox="-1.05 -37.75 171.49 37.85" height="87.29114868804665" data-palette-color="#ffffff"><path d="M12.95-0.1L12.95-0.1Q13.05-0.95 13.15-1.75 13.25-2.55 13.35-3.35L13.35-3.35 13.65-6.15Q13.7-6.85 13.75-7.45 13.8-8.05 13.85-8.55L13.85-8.55 9.5-8.55 7.5-1.35Q6.4-1.2 4.9-1.03 3.4-0.85 2.1-0.7L2.1-0.7Q1.3-0.6 0.53-0.5-0.25-0.4-1.05-0.3L-1.05-0.3 2.9-13.4Q3.6-15.75 4.5-18.75 5.4-21.75 6.33-24.9 7.25-28.05 8.08-30.83 8.9-33.6 9.4-35.5L9.4-35.5Q12.8-35.75 16.32-36.1 19.85-36.45 23.2-37.05L23.2-37.05Q22.95-34.25 22.73-30.73 22.5-27.2 22.33-23.45 22.15-19.7 21.95-16.05L21.95-16.05Q21.85-12.6 21.7-8.93 21.55-5.25 21.4-1.4L21.4-1.4Q20.65-1.3 19.9-1.2 19.15-1.1 18.4-1L18.4-1Q17.15-0.8 15.65-0.55 14.15-0.3 12.95-0.1ZM13.8-26.1L10.7-13.55Q11-13.55 11.83-13.6 12.65-13.65 13.4-13.7 14.15-13.75 14.3-13.75L14.3-13.75Q14.3-14.4 14.5-16.4 14.7-18.4 14.9-20.6L14.9-20.6Q15-21.9 15.13-23.28 15.25-24.65 15.4-26.1L15.4-26.1 15.7-30.45 14.95-30.4 13.8-26.1ZM28.4-0.85L20.15-0.3Q22.35-7 24.35-13.35L24.35-13.35Q25.2-15.95 26.1-18.9 27-21.85 27.9-24.83 28.8-27.8 29.6-30.55 30.4-33.3 30.95-35.45L30.95-35.45Q33.7-35.45 36.15-35.75L36.15-35.75Q37.4-35.9 38.72-36.05 40.05-36.2 41.45-36.3L41.45-36.3 41.15-33.85Q41.05-33.15 40.95-32.43 40.85-31.7 40.75-30.95L40.75-30.95Q40.65-30.2 40.5-29.43 40.35-28.65 40.25-27.85L40.25-27.85Q40.05-26.3 39.65-23.53 39.25-20.75 38.7-17.5L38.7-17.5 39.35-17.5Q40.8-21.3 41.75-23.83 42.7-26.35 43.3-27.95L43.3-27.95Q44.15-30.3 45.15-32.7 46.15-35.1 46.8-36.4L46.8-36.4Q48-36.5 49.67-36.73 51.35-36.95 53.07-37.25 54.8-37.55 56.05-37.75L56.05-37.75Q55.35-33.55 54.77-29.28 54.2-25 53.77-21.13 53.35-17.25 53.05-14.15L53.05-14.15Q52.75-11.05 52.5-8.03 52.25-5 52-2.05L52-2.05 43.3-0.5Q43.3-0.6 43.45-2.75 43.6-4.9 43.95-8.1L43.95-8.1Q44.3-11.3 44.65-14.18 45-17.05 45.35-18.9L45.35-18.9 44.9-18.9Q43.65-15.1 41.87-10.6 40.1-6.1 38.4-0.65L38.4-0.65Q36.65-0.6 35.4-0.53 34.15-0.45 32.5-0.35L32.5-0.35 34.1-18.9 33.35-18.9Q33.3-18.35 32.9-16.78 32.5-15.2 31.95-13.18 31.4-11.15 30.8-9.15L30.8-9.15Q28.55-1.3 28.4-0.85L28.4-0.85ZM61.15 0.1L61.15 0.1Q59.15 0.1 57.15-0.98 55.15-2.05 53.3-4.4L53.3-4.4 57-11.65Q57.55-10.7 58.62-9.85 59.7-9 60.9-8.5 62.1-8 62.95-8L62.95-8Q64.25-8 65.42-8.8 66.59-9.6 66.59-10.95L66.59-10.95Q66.59-12.7 65-14.15 63.4-15.6 61.4-17L61.4-17Q59.45-18.4 57.82-20.18 56.2-21.95 56.2-24.25L56.2-24.25Q56.2-26.85 57.7-29.08 59.2-31.3 61.6-32.98 64-34.65 66.72-35.58 69.45-36.5 71.9-36.5L71.9-36.5Q73.65-36.5 75.15-35.93 76.65-35.35 77.55-34.05 78.45-32.75 78.45-30.55L78.45-30.55Q78.45-30.2 78.42-29.85 78.4-29.5 78.34-29.15L78.34-29.15Q78.3-28.8 78.22-28.43 78.15-28.05 78.09-27.65L78.09-27.65 70.84-25.55Q70.95-25.95 71.02-26.35 71.09-26.75 71.09-27.15L71.09-27.15Q71.09-28.65 70.57-29.33 70.05-30 69.2-30L69.2-30Q68.75-30 67.9-29.53 67.05-29.05 66.37-28.23 65.7-27.4 65.7-26.4L65.7-26.4Q65.7-24.75 67.07-23.68 68.45-22.6 70.25-21.5L70.25-21.5Q71.09-21 72.15-19.93 73.2-18.85 73.97-17.03 74.75-15.2 74.75-12.35L74.75-12.35Q74.75-8.65 72.92-5.85 71.09-3.05 68-1.48 64.9 0.1 61.15 0.1ZM87.59-1.35L78.59 0.05Q79.14-2.7 79.72-5.43 80.29-8.15 80.79-10.8L80.79-10.8Q82.69-20.3 83.89-29L83.89-29Q83.34-29.1 82.74-29.13 82.14-29.15 81.59-29.1L81.59-29.1Q80.39-29 79.24-29.4L79.24-29.4Q79.29-29.8 79.29-30.28 79.29-30.75 79.29-31.25L79.29-31.25Q79.29-31.8 79.29-32.33 79.29-32.85 79.34-33.35L79.34-33.35Q79.39-33.9 79.39-34.52 79.39-35.15 79.44-35.8L79.44-35.8Q80.74-35.7 82.04-35.65 83.34-35.6 84.64-35.6L84.64-35.6Q88.34-35.6 91.72-35.85 95.09-36.1 97.94-36.45L97.94-36.45 97.39-33.75 96.94-31.4Q96.69-30.1 96.49-29.35L96.49-29.35Q95.94-29.2 95.39-29.1 94.84-29 94.29-28.95L94.29-28.95Q93.74-28.9 93.17-28.8 92.59-28.7 92.04-28.6L92.04-28.6Q91.29-24.9 90.82-22.2 90.34-19.5 89.97-17.03 89.59-14.55 89.09-11.6L89.09-11.6Q88.24-6.55 87.59-1.35L87.59-1.35ZM100.49-2.05L92.39 0.05 94.99-12.95Q95.59-16.55 96.29-20.35 96.99-24.15 97.61-27.85 98.24-31.55 98.59-34.8L98.59-34.8Q101.44-35.7 104.74-36.13 108.04-36.55 111.29-36.55L111.29-36.55Q115.09-36.55 116.47-34.9 117.84-33.25 117.84-30.45L117.84-30.45Q117.84-27.9 116.64-25.33 115.44-22.75 113.52-20.68 111.59-18.6 109.29-17.4L109.29-17.4Q110.19-15.4 111.22-13.03 112.24-10.65 113.14-8.5L113.14-8.5Q113.64-7.25 114.16-6 114.69-4.75 115.19-3.5L115.19-3.5 107.44-0.8 105.64-6.8Q104.89-9.3 104.27-11.63 103.64-13.95 103.54-14.9L103.54-14.9 102.89-14.7Q102.74-13.9 102.56-12.98 102.39-12.05 102.19-10.95L102.19-10.95Q101.99-9.85 101.79-8.83 101.59-7.8 101.39-6.8L101.39-6.8 100.49-2.05ZM105.74-29.6L104.14-21.65Q105.04-21.75 106.36-22.43 107.69-23.1 109.02-24.1 110.34-25.1 111.24-26.15 112.14-27.2 112.14-28L112.14-28Q112.14-29 110.97-29.33 109.79-29.65 107.89-29.65L107.89-29.65 106.79-29.65Q106.49-29.6 106.24-29.6 105.99-29.6 105.74-29.6L105.74-29.6ZM127.34-0.1L127.34-0.1Q127.44-0.95 127.54-1.75 127.64-2.55 127.74-3.35L127.74-3.35 128.04-6.15Q128.09-6.85 128.14-7.45 128.19-8.05 128.24-8.55L128.24-8.55 123.89-8.55 121.89-1.35Q120.79-1.2 119.29-1.03 117.79-0.85 116.49-0.7L116.49-0.7Q115.69-0.6 114.91-0.5 114.14-0.4 113.34-0.3L113.34-0.3 117.29-13.4Q117.99-15.75 118.89-18.75 119.79-21.75 120.71-24.9 121.64-28.05 122.46-30.83 123.29-33.6 123.79-35.5L123.79-35.5Q127.19-35.75 130.71-36.1 134.24-36.45 137.59-37.05L137.59-37.05Q137.34-34.25 137.11-30.73 136.89-27.2 136.71-23.45 136.54-19.7 136.34-16.05L136.34-16.05Q136.24-12.6 136.09-8.93 135.94-5.25 135.79-1.4L135.79-1.4Q135.04-1.3 134.29-1.2 133.54-1.1 132.79-1L132.79-1Q131.54-0.8 130.04-0.55 128.54-0.3 127.34-0.1ZM128.19-26.1L125.09-13.55Q125.39-13.55 126.21-13.6 127.04-13.65 127.79-13.7 128.54-13.75 128.69-13.75L128.69-13.75Q128.69-14.4 128.89-16.4 129.09-18.4 129.29-20.6L129.29-20.6Q129.39-21.9 129.51-23.28 129.64-24.65 129.79-26.1L129.79-26.1 130.09-30.45 129.34-30.4 128.19-26.1ZM142.78-0.85L134.53-0.3Q136.73-7 138.73-13.35L138.73-13.35Q139.59-15.95 140.48-18.9 141.38-21.85 142.28-24.83 143.19-27.8 143.98-30.55 144.78-33.3 145.34-35.45L145.34-35.45Q148.09-35.45 150.53-35.75L150.53-35.75Q151.78-35.9 153.11-36.05 154.44-36.2 155.84-36.3L155.84-36.3 155.53-33.85Q155.44-33.15 155.34-32.43 155.24-31.7 155.13-30.95L155.13-30.95Q155.03-30.2 154.88-29.43 154.73-28.65 154.63-27.85L154.63-27.85Q154.44-26.3 154.03-23.53 153.63-20.75 153.09-17.5L153.09-17.5 153.73-17.5Q155.19-21.3 156.13-23.83 157.09-26.35 157.69-27.95L157.69-27.95Q158.53-30.3 159.53-32.7 160.53-35.1 161.19-36.4L161.19-36.4Q162.38-36.5 164.06-36.73 165.74-36.95 167.46-37.25 169.19-37.55 170.44-37.75L170.44-37.75Q169.74-33.55 169.16-29.28 168.59-25 168.16-21.13 167.74-17.25 167.44-14.15L167.44-14.15Q167.13-11.05 166.88-8.03 166.63-5 166.38-2.05L166.38-2.05 157.69-0.5Q157.69-0.6 157.84-2.75 157.99-4.9 158.34-8.1L158.34-8.1Q158.69-11.3 159.03-14.18 159.38-17.05 159.74-18.9L159.74-18.9 159.28-18.9Q158.03-15.1 156.26-10.6 154.48-6.1 152.78-0.65L152.78-0.65Q151.03-0.6 149.78-0.53 148.53-0.45 146.88-0.35L146.88-0.35 148.48-18.9 147.73-18.9Q147.69-18.35 147.28-16.78 146.88-15.2 146.34-13.18 145.78-11.15 145.19-9.15L145.19-9.15Q142.94-1.3 142.78-0.85L142.78-0.85Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#ffffff" class="wordmark-text-0" data-fill-palette-color="primary" id="text-0"></path></svg></g></svg></g><g transform="matrix(1,0,0,1,0,107.89849390572596)"><svg viewBox="0 0 395.52 20.349688013136287" height="20.349688013136287" width="395.52"><g transform="matrix(1,0,0,1,0,0)"><svg width="395.52" viewBox="3.55 -36.8 730.72 37.599999999999994" height="20.349688013136287" data-palette-color="#ffffff"><path d="M3.55-3.95L3.55-21.05 11.15-21.05 11.15-0.3 7.6 0.1Q5.75 0.1 4.65-1 3.55-2.1 3.55-3.95L3.55-3.95ZM21.5 0.1L7.6 0.1 7.6-6.1 23.3-6.1Q23.65-5.6 23.9-4.83 24.15-4.05 24.15-3.1L24.15-3.1Q24.15-1.5 23.45-0.7 22.75 0.1 21.5 0.1L21.5 0.1ZM11.15-27.2L11.15-11.55 3.55-11.55 3.55-30.4Q4.05-30.5 5.08-30.65 6.1-30.8 7.05-30.8L7.05-30.8Q9.25-30.8 10.2-30.05 11.15-29.3 11.15-27.2L11.15-27.2ZM28.15-30.9L28.15-30.9Q28.15-32.6 29.32-33.75 30.5-34.9 32.3-34.9L32.3-34.9Q34.15-34.9 35.3-33.75 36.45-32.6 36.45-30.9L36.45-30.9Q36.45-29.25 35.3-28.05 34.15-26.85 32.3-26.85L32.3-26.85Q30.5-26.85 29.32-28.05 28.15-29.25 28.15-30.9ZM28.6-3.1L28.6-13.2 36-13.2 36-0.05Q35.55 0.1 34.65 0.23 33.75 0.35 32.7 0.35L32.7 0.35Q30.55 0.35 29.57-0.4 28.6-1.15 28.6-3.1L28.6-3.1ZM36-20.65L36-9.35 28.6-9.35 28.6-23.7Q29.05-23.85 29.97-24 30.9-24.15 31.95-24.15L31.95-24.15Q34.1-24.15 35.05-23.43 36-22.7 36-20.65L36-20.65ZM60.8-24.5L60.8-24.5Q62.34-24.5 63.37-23.83 64.39-23.15 64.39-21.55L64.39-21.55Q64.39-20.65 63.89-18.75 63.39-16.85 62.57-14.35 61.75-11.85 60.75-9.25 59.75-6.65 58.75-4.38 57.75-2.1 56.95-0.6L56.95-0.6Q56.39-0.2 55.2 0.13 53.99 0.45 52.55 0.45L52.55 0.45Q50.84 0.45 49.62 0 48.39-0.45 47.89-1.4L47.89-1.4Q47.34-2.45 46.55-4.35 45.74-6.25 44.84-8.68 43.95-11.1 43.05-13.7 42.14-16.3 41.39-18.7 40.64-21.1 40.2-22.9L40.2-22.9Q40.84-23.55 41.87-24.03 42.89-24.5 44.09-24.5L44.09-24.5Q45.64-24.5 46.64-23.85 47.64-23.2 48.09-21.4L48.09-21.4 50.34-13.45Q50.74-12.05 51.17-10.65 51.59-9.25 51.95-8.05 52.3-6.85 52.55-6L52.55-6 52.74-6Q53.95-10.05 55.17-14.68 56.39-19.3 57.34-23.7L57.34-23.7Q58.84-24.5 60.8-24.5ZM76.04-17.55L76.04-17.55 76.04-11.3 68.64-11.3 68.64-18.45Q68.64-19.85 69.32-20.83 69.99-21.8 71.19-22.55L71.19-22.55Q72.84-23.55 75.17-24.13 77.49-24.7 80.04-24.7L80.04-24.7Q85.14-24.7 85.14-21.3L85.14-21.3Q85.14-20.5 84.92-19.8 84.69-19.1 84.39-18.6L84.39-18.6Q83.89-18.7 83.17-18.78 82.44-18.85 81.59-18.85L81.59-18.85Q80.09-18.85 78.59-18.5 77.09-18.15 76.04-17.55ZM68.64-3.1L68.64-13.2 76.04-13.05 76.04-0.05Q75.54 0.1 74.64 0.23 73.74 0.35 72.69 0.35L72.69 0.35Q70.59 0.35 69.62-0.4 68.64-1.15 68.64-3.1L68.64-3.1ZM98.69 0.8L98.69 0.8Q93.59 0.8 90.57-1.2 87.54-3.2 87.54-7.15L87.54-7.15Q87.54-10.55 89.64-12.38 91.74-14.2 95.89-14.6L95.89-14.6 102.54-15.3 102.54-15.9Q102.54-17.6 101.22-18.35 99.89-19.1 97.44-19.1L97.44-19.1Q95.54-19.1 93.72-18.65 91.89-18.2 90.44-17.6L90.44-17.6Q89.84-18 89.42-18.82 88.99-19.65 88.99-20.55L88.99-20.55Q88.99-22.65 91.29-23.6L91.29-23.6Q92.74-24.2 94.67-24.48 96.59-24.75 98.39-24.75L98.39-24.75Q103.59-24.75 106.69-22.58 109.79-20.4 109.79-15.85L109.79-15.85 109.79-4.5Q109.79-3.25 109.14-2.48 108.49-1.7 107.49-1.15L107.49-1.15Q105.99-0.25 103.77 0.28 101.54 0.8 98.69 0.8ZM98.69-4.75L98.69-4.75Q99.84-4.75 100.97-4.98 102.09-5.2 102.59-5.5L102.59-5.5 102.59-10.3 98.39-9.9Q96.69-9.8 95.69-9.2 94.69-8.6 94.69-7.4L94.69-7.4Q94.69-6.2 95.64-5.48 96.59-4.75 98.69-4.75ZM115.24-30.9L115.24-30.9Q115.24-32.6 116.41-33.75 117.59-34.9 119.39-34.9L119.39-34.9Q121.24-34.9 122.39-33.75 123.54-32.6 123.54-30.9L123.54-30.9Q123.54-29.25 122.39-28.05 121.24-26.85 119.39-26.85L119.39-26.85Q117.59-26.85 116.41-28.05 115.24-29.25 115.24-30.9ZM115.69-3.1L115.69-13.2 123.09-13.2 123.09-0.05Q122.64 0.1 121.74 0.23 120.84 0.35 119.79 0.35L119.79 0.35Q117.64 0.35 116.66-0.4 115.69-1.15 115.69-3.1L115.69-3.1ZM123.09-20.65L123.09-9.35 115.69-9.35 115.69-23.7Q116.14-23.85 117.06-24 117.99-24.15 119.04-24.15L119.04-24.15Q121.19-24.15 122.14-23.43 123.09-22.7 123.09-20.65L123.09-20.65ZM148.54-7L148.54-7Q148.54-3.35 145.79-1.28 143.04 0.8 137.79 0.8L137.79 0.8Q133.69 0.8 131.04-0.4 128.39-1.6 128.39-3.95L128.39-3.95Q128.39-5 128.84-5.78 129.29-6.55 129.99-7L129.99-7Q131.39-6.2 133.26-5.53 135.14-4.85 137.54-4.85L137.54-4.85Q141.19-4.85 141.19-6.95L141.19-6.95Q141.19-7.85 140.54-8.38 139.89-8.9 138.39-9.15L138.39-9.15 136.29-9.65Q132.29-10.5 130.31-12.28 128.34-14.05 128.34-17.15L128.34-17.15Q128.34-20.65 131.16-22.73 133.99-24.8 138.79-24.8L138.79-24.8Q141.19-24.8 143.16-24.33 145.14-23.85 146.29-22.88 147.44-21.9 147.44-20.45L147.44-20.45Q147.44-19.45 147.04-18.7 146.64-17.95 145.99-17.45L145.99-17.45Q145.44-17.8 144.31-18.2 143.19-18.6 141.86-18.85 140.54-19.1 139.39-19.1L139.39-19.1Q137.59-19.1 136.59-18.63 135.59-18.15 135.59-17.15L135.59-17.15Q135.59-16.5 136.16-16.03 136.74-15.55 138.19-15.25L138.19-15.25 140.19-14.75Q144.64-13.75 146.59-11.88 148.54-10 148.54-7ZM177.38-12L177.38-12Q177.38-8.1 175.81-5.23 174.23-2.35 171.38-0.8 168.53 0.75 164.68 0.75L164.68 0.75Q160.88 0.75 158.01-0.78 155.13-2.3 153.56-5.18 151.98-8.05 151.98-12L151.98-12Q151.98-15.95 153.58-18.78 155.18-21.6 158.06-23.18 160.93-24.75 164.68-24.75L164.68-24.75Q168.48-24.75 171.33-23.18 174.18-21.6 175.78-18.73 177.38-15.85 177.38-12ZM164.68-18.9L164.68-18.9Q162.33-18.9 160.96-17.1 159.58-15.3 159.58-12L159.58-12Q159.58-8.65 160.93-6.88 162.28-5.1 164.68-5.1L164.68-5.1Q167.08-5.1 168.43-6.9 169.78-8.7 169.78-12L169.78-12Q169.78-15.25 168.43-17.07 167.08-18.9 164.68-18.9ZM204.98-15.55L204.98-15.55 204.98-10.85 197.53-10.85 197.53-15.3Q197.53-17.15 196.46-18.03 195.38-18.9 193.63-18.9L193.63-18.9Q192.38-18.9 191.33-18.57 190.28-18.25 189.43-17.8L189.43-17.8 189.43-10.85 182.03-10.85 182.03-18.65Q182.03-19.9 182.56-20.73 183.08-21.55 184.08-22.2L184.08-22.2Q185.68-23.3 188.18-24.03 190.68-24.75 193.68-24.75L193.68-24.75Q199.08-24.75 202.03-22.38 204.98-20 204.98-15.55ZM182.03-3.1L182.03-13.15 189.43-13.15 189.43-0.05Q188.93 0.1 188.03 0.23 187.13 0.35 186.08 0.35L186.08 0.35Q183.98 0.35 183.01-0.4 182.03-1.15 182.03-3.1L182.03-3.1ZM197.53-3.1L197.53-13.15 204.98-13.15 204.98-0.05Q204.48 0.1 203.58 0.23 202.68 0.35 201.63 0.35L201.63 0.35Q199.53 0.35 198.53-0.4 197.53-1.15 197.53-3.1L197.53-3.1ZM236.33-5.95L236.33-5.95 236.33-21 243.73-21 243.73-5Q243.73-3.8 243.23-2.98 242.73-2.15 241.63-1.5L241.63-1.5Q240.28-0.6 238.1 0.08 235.93 0.75 233.08 0.75L233.08 0.75Q228.93 0.75 225.9-0.65 222.88-2.05 221.25-4.88 219.63-7.7 219.63-11.9L219.63-11.9Q219.63-16.3 221.3-19.13 222.98-21.95 225.83-23.35 228.68-24.75 232.13-24.75L232.13-24.75Q233.93-24.75 235.33-24.35 236.73-23.95 237.63-23.4L237.63-23.4 237.63-17.3Q236.93-17.9 235.78-18.4 234.63-18.9 233.13-18.9L233.13-18.9Q231.38-18.9 230.03-18.15 228.68-17.4 227.93-15.85 227.18-14.3 227.18-11.9L227.18-11.9Q227.18-8.4 228.75-6.75 230.33-5.1 233.03-5.1L233.03-5.1Q234.13-5.1 234.98-5.38 235.83-5.65 236.33-5.95ZM243.73-29.5L243.73-19.55 236.33-19.5 236.33-32.55Q236.78-32.7 237.68-32.85 238.58-33 239.63-33L239.63-33Q241.83-33 242.78-32.25 243.73-31.5 243.73-29.5L243.73-29.5ZM268.97-10.85L253.07-8.5 252.77-13.5 265.17-15.45Q265.07-16.85 263.97-18.05 262.87-19.25 260.72-19.25L260.72-19.25Q258.47-19.25 256.97-17.73 255.47-16.2 255.37-13.4L255.37-13.4 255.62-9.95Q256.07-7.2 257.97-6.03 259.87-4.85 262.47-4.85L262.47-4.85Q264.57-4.85 266.42-5.45 268.27-6.05 269.42-6.7L269.42-6.7Q270.17-6.25 270.65-5.45 271.12-4.65 271.12-3.75L271.12-3.75Q271.12-2.25 269.95-1.25 268.77-0.25 266.7 0.25 264.62 0.75 261.97 0.75L261.97 0.75Q258.12 0.75 255.05-0.7 251.97-2.15 250.22-5.05 248.47-7.95 248.47-12.3L248.47-12.3Q248.47-15.5 249.5-17.85 250.52-20.2 252.25-21.73 253.97-23.25 256.15-24 258.32-24.75 260.67-24.75L260.67-24.75Q264.12-24.75 266.7-23.38 269.27-22 270.72-19.65 272.17-17.3 272.17-14.2L272.17-14.2Q272.17-12.65 271.32-11.85 270.47-11.05 268.97-10.85L268.97-10.85ZM305.52-24.5L305.52-24.5Q307.07-24.5 308.09-23.83 309.12-23.15 309.12-21.55L309.12-21.55Q309.12-20.65 308.62-18.75 308.12-16.85 307.29-14.35 306.47-11.85 305.47-9.25 304.47-6.65 303.47-4.38 302.47-2.1 301.67-0.6L301.67-0.6Q301.12-0.2 299.92 0.13 298.72 0.45 297.27 0.45L297.27 0.45Q295.57 0.45 294.34 0 293.12-0.45 292.62-1.4L292.62-1.4Q292.07-2.45 291.27-4.35 290.47-6.25 289.57-8.68 288.67-11.1 287.77-13.7 286.87-16.3 286.12-18.7 285.37-21.1 284.92-22.9L284.92-22.9Q285.57-23.55 286.59-24.03 287.62-24.5 288.82-24.5L288.82-24.5Q290.37-24.5 291.37-23.85 292.37-23.2 292.82-21.4L292.82-21.4 295.07-13.45Q295.47-12.05 295.89-10.65 296.32-9.25 296.67-8.05 297.02-6.85 297.27-6L297.27-6 297.47-6Q298.67-10.05 299.89-14.68 301.12-19.3 302.07-23.7L302.07-23.7Q303.57-24.5 305.52-24.5ZM332.72-10.85L316.82-8.5 316.52-13.5 328.92-15.45Q328.82-16.85 327.72-18.05 326.62-19.25 324.47-19.25L324.47-19.25Q322.22-19.25 320.72-17.73 319.22-16.2 319.12-13.4L319.12-13.4 319.37-9.95Q319.82-7.2 321.72-6.03 323.62-4.85 326.22-4.85L326.22-4.85Q328.32-4.85 330.17-5.45 332.02-6.05 333.17-6.7L333.17-6.7Q333.92-6.25 334.39-5.45 334.87-4.65 334.87-3.75L334.87-3.75Q334.87-2.25 333.69-1.25 332.52-0.25 330.44 0.25 328.37 0.75 325.72 0.75L325.72 0.75Q321.87 0.75 318.79-0.7 315.72-2.15 313.97-5.05 312.22-7.95 312.22-12.3L312.22-12.3Q312.22-15.5 313.24-17.85 314.27-20.2 315.99-21.73 317.72-23.25 319.89-24 322.07-24.75 324.42-24.75L324.42-24.75Q327.87-24.75 330.44-23.38 333.02-22 334.47-19.65 335.92-17.3 335.92-14.2L335.92-14.2Q335.92-12.65 335.07-11.85 334.22-11.05 332.72-10.85L332.72-10.85ZM322.27-31.35L322.27-31.35 327.27-36.8Q329.52-36.8 330.67-35.83 331.82-34.85 331.82-33.65L331.82-33.65Q331.82-32.6 331.37-31.9 330.92-31.2 329.87-30.3L329.87-30.3 325.12-26.25Q323.22-26.25 322.22-27.18 321.22-28.1 321.22-29.15L321.22-29.15Q321.22-29.75 321.47-30.25 321.72-30.75 322.27-31.35ZM363.51-15.05L363.51-10.2 356.06-10.2 356.06-14.65Q356.06-16.95 354.89-17.93 353.71-18.9 351.91-18.9L351.91-18.9Q350.31-18.9 349.04-18.3 347.76-17.7 346.86-16.95L346.86-16.95 346.66-22.95Q347.81-23.6 349.51-24.18 351.21-24.75 353.26-24.75L353.26-24.75Q358.01-24.75 360.76-22.33 363.51-19.9 363.51-15.05L363.51-15.05ZM340.56-3.1L340.56-13.2 347.96-13.2 347.96-0.05Q347.46 0.1 346.56 0.23 345.66 0.35 344.61 0.35L344.61 0.35Q342.51 0.35 341.54-0.4 340.56-1.15 340.56-3.1L340.56-3.1ZM356.06-3.1L356.06-13.2 363.51-13.2 363.51-0.05Q363.01 0.1 362.11 0.23 361.21 0.35 360.16 0.35L360.16 0.35Q358.01 0.35 357.04-0.4 356.06-1.15 356.06-3.1L356.06-3.1ZM347.96-29.5L347.96-9.35 340.56-9.35 340.56-32.55Q341.01-32.7 341.91-32.85 342.81-33 343.86-33L343.86-33Q346.01-33 346.99-32.25 347.96-31.5 347.96-29.5L347.96-29.5ZM369.06-30.9L369.06-30.9Q369.06-32.6 370.24-33.75 371.41-34.9 373.21-34.9L373.21-34.9Q375.06-34.9 376.21-33.75 377.36-32.6 377.36-30.9L377.36-30.9Q377.36-29.25 376.21-28.05 375.06-26.85 373.21-26.85L373.21-26.85Q371.41-26.85 370.24-28.05 369.06-29.25 369.06-30.9ZM369.51-3.1L369.51-13.2 376.91-13.2 376.91-0.05Q376.46 0.1 375.56 0.23 374.66 0.35 373.61 0.35L373.61 0.35Q371.46 0.35 370.49-0.4 369.51-1.15 369.51-3.1L369.51-3.1ZM376.91-20.65L376.91-9.35 369.51-9.35 369.51-23.7Q369.96-23.85 370.89-24 371.81-24.15 372.86-24.15L372.86-24.15Q375.01-24.15 375.96-23.43 376.91-22.7 376.91-20.65L376.91-20.65ZM395.86-18.85L395.86-18.85Q393.16-18.85 391.23-17.07 389.31-15.3 389.31-11.9L389.31-11.9Q389.31-8.55 391.16-6.85 393.01-5.15 395.81-5.15L395.81-5.15Q397.46-5.15 398.68-5.58 399.91-6 400.81-6.5L400.81-6.5Q401.66-5.9 402.11-5.18 402.56-4.45 402.56-3.4L402.56-3.4Q402.56-1.55 400.56-0.4 398.56 0.75 395.01 0.75L395.01 0.75Q391.06 0.75 388.06-0.68 385.06-2.1 383.41-4.95 381.76-7.8 381.76-11.9L381.76-11.9Q381.76-16.25 383.56-19.07 385.36-21.9 388.33-23.33 391.31-24.75 394.81-24.75L394.81-24.75Q398.26-24.75 400.23-23.5 402.21-22.25 402.21-20.4L402.21-20.4Q402.21-19.5 401.78-18.78 401.36-18.05 400.81-17.5L400.81-17.5Q399.86-18 398.63-18.43 397.41-18.85 395.86-18.85ZM407.21-9.35L407.21-9.35 407.21-12.95 414.61-12.95 414.61-9.4Q414.61-7.1 415.78-6.1 416.96-5.1 419.11-5.1L419.11-5.1Q420.46-5.1 421.36-5.35 422.26-5.6 422.71-5.85L422.71-5.85 422.71-12.95 430.16-12.95 430.16-4.95Q430.16-3.75 429.68-2.9 429.21-2.05 428.16-1.4L428.16-1.4Q426.56-0.4 424.23 0.18 421.91 0.75 419.06 0.75L419.06 0.75Q415.51 0.75 412.83-0.3 410.16-1.35 408.68-3.58 407.21-5.8 407.21-9.35ZM430.16-20.85L430.16-10.7 422.71-10.7 422.71-23.9Q423.21-24.05 424.11-24.2 425.01-24.35 426.06-24.35L426.06-24.35Q428.21-24.35 429.18-23.63 430.16-22.9 430.16-20.85L430.16-20.85ZM414.61-20.85L414.61-10.7 407.21-10.7 407.21-23.9Q407.66-24.05 408.56-24.2 409.46-24.35 410.51-24.35L410.51-24.35Q412.66-24.35 413.63-23.63 414.61-22.9 414.61-20.85L414.61-20.85ZM436.15-3.1L436.15-13.2 443.6-13.05 443.6-0.05Q443.1 0.1 442.2 0.23 441.3 0.35 440.25 0.35L440.25 0.35Q438.15 0.35 437.15-0.4 436.15-1.15 436.15-3.1L436.15-3.1ZM443.6-29.5L443.6-9.2 436.15-9.35 436.15-32.55Q436.65-32.7 437.55-32.85 438.45-33 439.5-33L439.5-33Q441.65-33 442.63-32.25 443.6-31.5 443.6-29.5L443.6-29.5ZM469-10.85L453.1-8.5 452.8-13.5 465.2-15.45Q465.1-16.85 464-18.05 462.9-19.25 460.75-19.25L460.75-19.25Q458.5-19.25 457-17.73 455.5-16.2 455.4-13.4L455.4-13.4 455.65-9.95Q456.1-7.2 458-6.03 459.9-4.85 462.5-4.85L462.5-4.85Q464.6-4.85 466.45-5.45 468.3-6.05 469.45-6.7L469.45-6.7Q470.2-6.25 470.68-5.45 471.15-4.65 471.15-3.75L471.15-3.75Q471.15-2.25 469.98-1.25 468.8-0.25 466.73 0.25 464.65 0.75 462 0.75L462 0.75Q458.15 0.75 455.08-0.7 452-2.15 450.25-5.05 448.5-7.95 448.5-12.3L448.5-12.3Q448.5-15.5 449.53-17.85 450.55-20.2 452.28-21.73 454-23.25 456.18-24 458.35-24.75 460.7-24.75L460.7-24.75Q464.15-24.75 466.73-23.38 469.3-22 470.75-19.65 472.2-17.3 472.2-14.2L472.2-14.2Q472.2-12.65 471.35-11.85 470.5-11.05 469-10.85L469-10.85ZM506.2-7L506.2-7Q506.2-3.35 503.45-1.28 500.7 0.8 495.45 0.8L495.45 0.8Q491.35 0.8 488.7-0.4 486.05-1.6 486.05-3.95L486.05-3.95Q486.05-5 486.5-5.78 486.95-6.55 487.65-7L487.65-7Q489.05-6.2 490.92-5.53 492.8-4.85 495.2-4.85L495.2-4.85Q498.85-4.85 498.85-6.95L498.85-6.95Q498.85-7.85 498.2-8.38 497.55-8.9 496.05-9.15L496.05-9.15 493.95-9.65Q489.95-10.5 487.97-12.28 486-14.05 486-17.15L486-17.15Q486-20.65 488.82-22.73 491.65-24.8 496.45-24.8L496.45-24.8Q498.85-24.8 500.82-24.33 502.8-23.85 503.95-22.88 505.1-21.9 505.1-20.45L505.1-20.45Q505.1-19.45 504.7-18.7 504.3-17.95 503.65-17.45L503.65-17.45Q503.1-17.8 501.97-18.2 500.85-18.6 499.52-18.85 498.2-19.1 497.05-19.1L497.05-19.1Q495.25-19.1 494.25-18.63 493.25-18.15 493.25-17.15L493.25-17.15Q493.25-16.5 493.82-16.03 494.4-15.55 495.85-15.25L495.85-15.25 497.85-14.75Q502.3-13.75 504.25-11.88 506.2-10 506.2-7ZM510.79-9.35L510.79-9.35 510.79-12.95 518.19-12.95 518.19-9.4Q518.19-7.1 519.37-6.1 520.54-5.1 522.69-5.1L522.69-5.1Q524.04-5.1 524.94-5.35 525.84-5.6 526.29-5.85L526.29-5.85 526.29-12.95 533.74-12.95 533.74-4.95Q533.74-3.75 533.27-2.9 532.79-2.05 531.74-1.4L531.74-1.4Q530.14-0.4 527.82 0.18 525.49 0.75 522.64 0.75L522.64 0.75Q519.09 0.75 516.42-0.3 513.74-1.35 512.27-3.58 510.79-5.8 510.79-9.35ZM533.74-20.85L533.74-10.7 526.29-10.7 526.29-23.9Q526.79-24.05 527.69-24.2 528.59-24.35 529.64-24.35L529.64-24.35Q531.79-24.35 532.77-23.63 533.74-22.9 533.74-20.85L533.74-20.85ZM518.19-20.85L518.19-10.7 510.79-10.7 510.79-23.9Q511.24-24.05 512.14-24.2 513.04-24.35 514.09-24.35L514.09-24.35Q516.24-24.35 517.22-23.63 518.19-22.9 518.19-20.85L518.19-20.85ZM546.89-17.55L546.89-17.55 546.89-11.3 539.49-11.3 539.49-18.45Q539.49-19.85 540.17-20.83 540.84-21.8 542.04-22.55L542.04-22.55Q543.69-23.55 546.02-24.13 548.34-24.7 550.89-24.7L550.89-24.7Q555.99-24.7 555.99-21.3L555.99-21.3Q555.99-20.5 555.77-19.8 555.54-19.1 555.24-18.6L555.24-18.6Q554.74-18.7 554.02-18.78 553.29-18.85 552.44-18.85L552.44-18.85Q550.94-18.85 549.44-18.5 547.94-18.15 546.89-17.55ZM539.49-3.1L539.49-13.2 546.89-13.05 546.89-0.05Q546.39 0.1 545.49 0.23 544.59 0.35 543.54 0.35L543.54 0.35Q541.44 0.35 540.47-0.4 539.49-1.15 539.49-3.1L539.49-3.1ZM591.49-16.55L591.49-16.55 591.49-10.85 584.04-10.85 584.04-15.6Q584.04-17.3 583.04-18.1 582.04-18.9 580.54-18.9L580.54-18.9Q579.44-18.9 578.56-18.57 577.69-18.25 577.09-17.9L577.09-17.9 577.09-10.85 569.69-10.85 569.69-18.65Q569.69-19.9 570.21-20.73 570.74-21.55 571.74-22.2L571.74-22.2Q573.39-23.35 575.79-24.05 578.19-24.75 580.79-24.75L580.79-24.75Q583.19-24.75 585.29-24 587.39-23.25 588.94-21.7L588.94-21.7Q589.34-21.4 589.71-21.08 590.09-20.75 590.29-20.35L590.29-20.35Q590.79-19.55 591.14-18.55 591.49-17.55 591.49-16.55ZM605.84-15.8L605.84-15.8 605.84-10.85 598.44-10.85 598.44-15.6Q598.44-17.3 597.49-18.1 596.54-18.9 594.99-18.9L594.99-18.9Q593.84-18.9 592.81-18.43 591.79-17.95 591.04-17.3L591.04-17.3 587.14-21.6Q588.79-22.9 590.89-23.83 592.99-24.75 596.04-24.75L596.04-24.75Q598.64-24.75 600.89-23.85 603.14-22.95 604.49-21 605.84-19.05 605.84-15.8ZM569.69-3.1L569.69-13.15 577.09-13.15 577.09-0.05Q576.59 0.1 575.69 0.23 574.79 0.35 573.74 0.35L573.74 0.35Q571.64 0.35 570.66-0.4 569.69-1.15 569.69-3.1L569.69-3.1ZM584.04-3.1L584.04-13.15 591.49-13.15 591.49-0.05Q590.99 0.1 590.09 0.23 589.19 0.35 588.14 0.35L588.14 0.35Q585.99 0.35 585.01-0.4 584.04-1.15 584.04-3.1L584.04-3.1ZM598.44-3.1L598.44-13.15 605.84-13.15 605.84-0.05Q605.39 0.1 604.49 0.23 603.59 0.35 602.54 0.35L602.54 0.35Q600.39 0.35 599.41-0.4 598.44-1.15 598.44-3.1L598.44-3.1ZM631.03-10.85L615.13-8.5 614.83-13.5 627.23-15.45Q627.13-16.85 626.03-18.05 624.93-19.25 622.78-19.25L622.78-19.25Q620.53-19.25 619.03-17.73 617.53-16.2 617.43-13.4L617.43-13.4 617.68-9.95Q618.13-7.2 620.03-6.03 621.93-4.85 624.53-4.85L624.53-4.85Q626.63-4.85 628.48-5.45 630.33-6.05 631.48-6.7L631.48-6.7Q632.23-6.25 632.71-5.45 633.18-4.65 633.18-3.75L633.18-3.75Q633.18-2.25 632.01-1.25 630.83-0.25 628.76 0.25 626.68 0.75 624.03 0.75L624.03 0.75Q620.18 0.75 617.11-0.7 614.03-2.15 612.28-5.05 610.53-7.95 610.53-12.3L610.53-12.3Q610.53-15.5 611.56-17.85 612.58-20.2 614.31-21.73 616.03-23.25 618.21-24 620.38-24.75 622.73-24.75L622.73-24.75Q626.18-24.75 628.76-23.38 631.33-22 632.78-19.65 634.23-17.3 634.23-14.2L634.23-14.2Q634.23-12.65 633.38-11.85 632.53-11.05 631.03-10.85L631.03-10.85ZM658.23-7L658.23-7Q658.23-3.35 655.48-1.28 652.73 0.8 647.48 0.8L647.48 0.8Q643.38 0.8 640.73-0.4 638.08-1.6 638.08-3.95L638.08-3.95Q638.08-5 638.53-5.78 638.98-6.55 639.68-7L639.68-7Q641.08-6.2 642.96-5.53 644.83-4.85 647.23-4.85L647.23-4.85Q650.88-4.85 650.88-6.95L650.88-6.95Q650.88-7.85 650.23-8.38 649.58-8.9 648.08-9.15L648.08-9.15 645.98-9.65Q641.98-10.5 640-12.28 638.03-14.05 638.03-17.15L638.03-17.15Q638.03-20.65 640.86-22.73 643.68-24.8 648.48-24.8L648.48-24.8Q650.88-24.8 652.86-24.33 654.83-23.85 655.98-22.88 657.13-21.9 657.13-20.45L657.13-20.45Q657.13-19.45 656.73-18.7 656.33-17.95 655.68-17.45L655.68-17.45Q655.13-17.8 654-18.2 652.88-18.6 651.55-18.85 650.23-19.1 649.08-19.1L649.08-19.1Q647.28-19.1 646.28-18.63 645.28-18.15 645.28-17.15L645.28-17.15Q645.28-16.5 645.86-16.03 646.43-15.55 647.88-15.25L647.88-15.25 649.88-14.75Q654.33-13.75 656.28-11.88 658.23-10 658.23-7ZM662.83-9.35L662.83-9.35 662.83-12.95 670.23-12.95 670.23-9.4Q670.23-7.1 671.4-6.1 672.58-5.1 674.73-5.1L674.73-5.1Q676.08-5.1 676.98-5.35 677.88-5.6 678.33-5.85L678.33-5.85 678.33-12.95 685.78-12.95 685.78-4.95Q685.78-3.75 685.3-2.9 684.83-2.05 683.78-1.4L683.78-1.4Q682.18-0.4 679.85 0.18 677.53 0.75 674.68 0.75L674.68 0.75Q671.13 0.75 668.45-0.3 665.78-1.35 664.3-3.58 662.83-5.8 662.83-9.35ZM685.78-20.85L685.78-10.7 678.33-10.7 678.33-23.9Q678.83-24.05 679.73-24.2 680.63-24.35 681.68-24.35L681.68-24.35Q683.83-24.35 684.8-23.63 685.78-22.9 685.78-20.85L685.78-20.85ZM670.23-20.85L670.23-10.7 662.83-10.7 662.83-23.9Q663.28-24.05 664.18-24.2 665.08-24.35 666.13-24.35L666.13-24.35Q668.28-24.35 669.25-23.63 670.23-22.9 670.23-20.85L670.23-20.85ZM698.92-17.55L698.92-17.55 698.92-11.3 691.52-11.3 691.52-18.45Q691.52-19.85 692.2-20.83 692.87-21.8 694.07-22.55L694.07-22.55Q695.72-23.55 698.05-24.13 700.37-24.7 702.92-24.7L702.92-24.7Q708.02-24.7 708.02-21.3L708.02-21.3Q708.02-20.5 707.8-19.8 707.57-19.1 707.27-18.6L707.27-18.6Q706.77-18.7 706.05-18.78 705.32-18.85 704.47-18.85L704.47-18.85Q702.97-18.85 701.47-18.5 699.97-18.15 698.92-17.55ZM691.52-3.1L691.52-13.2 698.92-13.05 698.92-0.05Q698.42 0.1 697.52 0.23 696.62 0.35 695.57 0.35L695.57 0.35Q693.47 0.35 692.5-0.4 691.52-1.15 691.52-3.1L691.52-3.1ZM731.07-10.85L715.17-8.5 714.87-13.5 727.27-15.45Q727.17-16.85 726.07-18.05 724.97-19.25 722.82-19.25L722.82-19.25Q720.57-19.25 719.07-17.73 717.57-16.2 717.47-13.4L717.47-13.4 717.72-9.95Q718.17-7.2 720.07-6.03 721.97-4.85 724.57-4.85L724.57-4.85Q726.67-4.85 728.52-5.45 730.37-6.05 731.52-6.7L731.52-6.7Q732.27-6.25 732.75-5.45 733.22-4.65 733.22-3.75L733.22-3.75Q733.22-2.25 732.05-1.25 730.87-0.25 728.8 0.25 726.72 0.75 724.07 0.75L724.07 0.75Q720.22 0.75 717.15-0.7 714.07-2.15 712.32-5.05 710.57-7.95 710.57-12.3L710.57-12.3Q710.57-15.5 711.6-17.85 712.62-20.2 714.35-21.73 716.07-23.25 718.25-24 720.42-24.75 722.77-24.75L722.77-24.75Q726.22-24.75 728.8-23.38 731.37-22 732.82-19.65 734.27-17.3 734.27-14.2L734.27-14.2Q734.27-12.65 733.42-11.85 732.57-11.05 731.07-10.85L731.07-10.85Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#ffffff" class="slogan-text-1" data-fill-palette-color="secondary" id="text-1"></path></svg></g></svg></g></svg></g></svg></g><g transform="matrix(1,0,0,1,416.1273452176793,0)"><svg viewBox="0 0 177.2389874118676 177.2389874118676" height="177.2389874118676" width="177.2389874118676"><g><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="1 1 62 62" style="enable-background:new 0 0 64 64;" xml:space="preserve" height="177.2389874118676" width="177.2389874118676" class="icon-icon-0" data-fill-palette-color="accent" id="icon-0"><g fill="#ffffff" data-fill-palette-color="accent"><path d="M1 63H7V1H1zM3 61V53H5V61zM5 23V31H3V23zM3 21V13H5V21zM5 33V41H3V33zM5 43V51H3V43zM5 3V11H3V3z" fill="#ffffff" data-fill-palette-color="accent"></path><path d="M57 1V63H63V1zM61 3V11H59V3zM59 41V33H61V41zM61 43V51H59V43zM59 31V23H61V31zM59 21V13H61V21zM59 61V53H61V61z" fill="#ffffff" data-fill-palette-color="accent"></path><path d="M52 37V34.764L51.895 34.553A8.19 8.19 0 0 0 44.528 30H42.472A8.19 8.19 0 0 0 35.105 34.553L35 34.764V37C33.346 37 32 38.346 32 40S33.346 43 35 43H36V49.764L35 51.764V55.586C35 56.765 35.459 57.873 36.292 58.707S38.234 60 39.414 60H47.586C48.766 60 49.874 59.541 50.708 58.707S52 56.765 52 55.586V51.764L51 49.764V43H52C53.654 43 55 41.654 55 40S53.654 37 52 37M49 40.997C47.382 40.483 45.056 40 43 40 41.056 40 39.346 40.429 38 40.931V39.764L37.319 38.403C38.388 37.861 40.482 37 43 37 45.619 37 48.282 37.934 49.637 38.491L49 39.764zM38 50.236V43.086C38.53 42.856 39.21 42.606 40 42.401V53.763A5.7 5.7 0 0 1 37.172 51.893zM42 42.048C42.325 42.019 42.658 42 43 42 43.65 42 44.33 42.057 45 42.148V54H42zM47 42.523C47.794 42.711 48.49 42.921 49 43.111V50.236L49.828 51.892A5.7 5.7 0 0 1 47 53.762zM42.472 32H44.528A6.2 6.2 0 0 1 50 35.245V36.479C48.412 35.857 45.731 35 43 35 40.483 35 38.353 35.727 37 36.34V35.245A6.2 6.2 0 0 1 42.472 32M35 41A1.001 1.001 0 0 1 35 39H35.382L36 40.236V41zM49.292 57.293A2.4 2.4 0 0 1 47.586 58H39.414A2.4 2.4 0 0 1 37.707 57.293 2.4 2.4 0 0 1 37 55.586V54.47A7.7 7.7 0 0 0 41.605 56H45.394A7.7 7.7 0 0 0 49.999 54.47V55.586A2.4 2.4 0 0 1 49.292 57.293M52 41H51V40.236L51.618 39H52A1.001 1.001 0 0 1 52 41" fill="#ffffff" data-fill-palette-color="accent"></path><path d="M29 20C30.654 20 32 18.654 32 17S30.654 14 29 14V11.764L28.895 11.553A8.19 8.19 0 0 0 21.528 7H19.472A8.19 8.19 0 0 0 12.105 11.553L12 11.764V14C10.346 14 9 15.346 9 17S10.346 20 12 20H13V26.764L12 28.764V32.586C12 33.765 12.459 34.873 13.292 35.707S15.234 37 16.414 37H24.586C25.766 37 26.874 36.541 27.708 35.707S29 33.765 29 32.586V28.764L28 26.764V20zM30 17C30 17.551 29.551 18 29 18H28V17.236L28.618 16H29C29.551 16 30 16.449 30 17M26 17.997C24.382 17.484 22.056 17 20 17 18.057 17 16.346 17.43 15 17.931V16.764L14.319 15.402C15.388 14.861 17.482 14 20 14 22.619 14 25.282 14.934 26.637 15.491L26 16.764zM15 27.236V20.087C15.53 19.857 16.21 19.607 17 19.402V30.763A5.7 5.7 0 0 1 14.172 28.893zM19 19.048C19.325 19.019 19.658 19 20 19 20.65 19 21.33 19.057 22 19.148V31H19zM24 19.523C24.794 19.711 25.49 19.921 26 20.111V27.236L26.828 28.892A5.7 5.7 0 0 1 24 30.762zM19.472 9H21.528A6.2 6.2 0 0 1 27 12.245V13.479C25.412 12.857 22.731 12 20 12 17.483 12 15.353 12.727 14 13.34V12.245A6.2 6.2 0 0 1 19.472 9M12 18C11.449 18 11 17.551 11 17S11.449 16 12 16H12.382L13 17.236V18zM26.292 34.293A2.4 2.4 0 0 1 24.586 35H16.414A2.4 2.4 0 0 1 14.707 34.293 2.4 2.4 0 0 1 14 32.586V31.47A7.7 7.7 0 0 0 18.605 33H22.394A7.7 7.7 0 0 0 26.999 31.47V32.586A2.4 2.4 0 0 1 26.292 34.293" fill="#ffffff" data-fill-palette-color="accent"></path><rect x="31" y="1" width="2" height="8" fill="#ffffff" data-fill-palette-color="accent"></rect><rect x="31" y="23" width="2" height="8" fill="#ffffff" data-fill-palette-color="accent"></rect><rect x="31" y="45" width="2" height="8" fill="#ffffff" data-fill-palette-color="accent"></rect></g></svg></g></svg></g></svg></g><defs></defs></svg><rect width="395.52" height="118.14213319195514" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>`;
});
const Eumap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = 1e3 / 2 } = $$props;
  let { height = 1e3 / 2.5 } = $$props;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} viewBox="0 0 1110.000000 1280.000000" preserveAspectRatio="xMidYMid meet"><metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017 source : https://svgsilh.com/image/23571.html, svelted by Jo
</metadata><g transform="matrix(.1 0 0-.1 0 1280)"><path d="M7603,12793c-35-7-27-29,17-50c22-10,40-21,40-25s-12-16-27-28c-40-32-53-54-64-117-6-32-17-68-25-80-12-20-81-63-100-63-4,0-3,31,0,70c6,62,5,70-13,82-19,12-19,12,1,41c26,36,37,117,17,117-18,0-23-8-142-230-153-287-164-301-186-239-16,47-14,73,13,131c14,29,34,78,46,108c11,30,42,86,68,123c45,66,46,69,27,83-29,21-54,17-67-11-13-30-24-32-33-6-10,33-46,71-66,71-23,0-34-23-49-102-6-31-18-62-27-70-29-23-43-72-33-109c5-18,8-34,6-36s-21,7-41,22c-21,14-41,25-46,25-20,0-61-71-61-105c0-29-5-38-29-51-32-16-36-35-15-85c7-19,16-46,20-62c6-25,5-27-18-21-18,4-35-1-57-17-31-22-31-22-25-1c5,14,0,27-15,41-13,12-25,21-28,21s-13,5-21,10c-13,8-12,11,5,24c27,19,14,29-21,16-22-9-25-13-14-20c15-9,16-9-35-25-20-6-19,5,2,20c15,11,13,14-22,24-54,15-73,15-57-1c7-7,12-35,12-64c0-28,7-68,15-87c8-20,15-41,15-47c0-20-31-10-42,15-11,24-53,45-93,45-12,0-43-11-70-25-28-15-55-23-67-19-27,8-48-13-48-52c0-44,12-74,45-106c33-33,28-35-25-8-52,26-80,26-80,0c0-24-29-83-59-120-26-32-26-24-1,32c35,79,64,298,41,312-15,10-29-17-51-97-11-43-46-127-78-186l-57-108-31,34c-25,26-39,33-70,33-22,0-49-7-61-15-22-15-22-15-21,20c2,48-18,68-32,31-5-15-10-43-10-62c0-45-16-74-40-74-26,0-90-57-90-81c0-10,9-23,21-29c11-7,18-18,15-25-2-7,4-21,15-31c19-17,18-18-53-39-182-53-298-155-177-155c30,0,23-13-21-38-42-24-51-50-25-72c20-17,19-30-7-57-20-21-20-24-5-41c46-50,3-80-132-93-109-10-140-18-160-43-34-41,25-63,72-26c29,23,70,26,86,6c15-18-4-33-49-38-30-3-35-7-38-31-4-34,15-43,68-29c51,13,57,3,30-53-24-49-31-53-50-30-7,8-22,15-33,15s-31,9-43,21c-14,13-29,19-41,15-22-7-109-93-102-101c3-2,43-12,89-21c96-18,115-26,131-55c16-30,4-34-27-10-63,49-164,49-214,0-16-16-35-29-42-29-8,0-29-15-47-34l-33-34l29-26l28-26h-38c-47,0-48-15-2-31c45-17,45-29,0-29-40,0-44-9-15-28c26-16,19-28-33-52-23-11-55-31-72-44-48-39-26-48,110-44l117,3-53-48c-30-27-67-55-82-64-26-13-31-13-46,1-24,22-44,20-69-7-29-31-28-45,9-90c32-39,30-45-11-22-45,26-66,19-89-28-36-74-37-102-6-148l27-42-28,7c-16,4-36,9-45,12-22,6-50-22-42-44c10-30,46-62,67-62c12,0,38,14,59,31c20,17,37,27,37,22c0-17-93-114-166-174-41-33-72-64-69-69c3-4-21-31-52-59l-58-51h58c65,0,73-10,21-29-23-8-34-18-30-26c5-15-29-65-45-65-6,0-22,14-36,30-30,36-64,41-60,8c1-16-5-23-30-30-42-11-79-58-99-124-9-31-29-71-46-90l-30-34h30c41,0,48-15,22-48l-22-27l21-3c29-5,88,15,134,44c47,31,48,47,2,42-19-2-35-1-35,3c0,12,83,77,112,88c38,14,58-8,58-64c0-33-6-50-22-65-12-11-25-20-29-20-16,0-39-33-49-69-11-43-26-51-101-51-56,0-64-7-36-31l22-19-50,2-50,3l3,41c4,48-14,68-51,59-33-9-78-55-54-55c55,0-20-71-127-121-36-17-66-33-66-36s11-14,25-25c18-14,25-29,25-55v-35l-34,22c-44,26-53,13-21-34l24-36h-87c-99,0-129-11-97-36c18-14,12-15-80-14-171,3-175,3-175-20c0-17,7-20,43-20c46,0,108-34,128-71c9-17,6-28-17-60-15-21-31-39-35-39-5,0-9,21-9,46c0,85-35,106-100,62-48-33-58-53-37-76c9-10,17-21,17-24s-28-3-62-1c-54,4-67,2-91-17-57-45-40-53,146-65c91-6,117-12,117-24c0-15-52-31-100-31-36,0-52-5-58-17-9-15-14-12-45,20-45,49-86,47-129-7-24-29-22-34,9-38c19-2,29-10,31-23c2-11,10-25,19-32c13-10,10-14-19-29l-33-18l49-9l48-10-76-29c-114-44-105-52,74-63c58-3,109-10,113-15c12-10-40-26-133-40-41-6-79-15-84-20-21-21,68-101,95-85c15,10,39-14,39-39c0-11-7-41-16-66-16-45-12-104,7-116c6-3,28,8,50,26s43,29,46,26c11-11-31-102-62-133-23-23-29-35-21-42c20-17,61-22,89-12c36,14,35-2-2-40-16-16-40-29-53-29s-48-22-83-51c-68-59-89-85-80-99c15-25,95,1,95,31c0,32,106,89,166,89c33,0,30-18-8-57-30-31-31-33-10-33c31,0,27-15-9-41-21-15-29-27-26-41c3-12-2-23-14-31-24-15-25-30-1-23c9,2,37,8,62,11l45,7-43-31c-26-19-42-39-42-52v-20l-26,20c-34,27-54,27-54-1v-21l-25,23-25,23v-33c0-46,27-84,119-168c46-41,81-82,83-95c3-21,7-22,94-22c82,0,96,3,150,31c32,17,65,29,71,27c7-3,47,28,88,69c52,52,77,83,81,106c5,23,15,37,32,43c13,5,47,30,75,55c40,36,55,44,76,39c34-7,47,3,66,48c10,25,15,65,14,125-1,48,2,98,6,112c17,57,67,80,79,38c3-13,6-65,6-116s5-102,11-113c5-11,34-30,64-43c34-16,59-34,68-52l14-28l14,25c9,16,14,59,14,125c1,79,5,108,19,128c9,15,14,31,11,37-4,5,13,31,37,58c69,77,89,179,64,321-21,114-21,116,13,128s58,44,67,89c5,27,0,38-39,80-24,26-52,63-62,82-25,50-36,194-36,491c0,285,6,329,56,416c34,58,106,121,154,134c23,6,63,8,90,4c68-9,96,0,111,35c17,42,4,85-41,137-46,53-47,44,23,203c66,152,85,235,96,423c10,170,16,188,64,188c40,0,94,24,107,48c6,12,8,40,5,67-6,38-3,49,14,68c37,40,182,279,182,301c0,11-14,41-30,66s-30,52-30,60c0,9,18,34,41,55c24,24,57,74,81,123c44,92,103,162,137,162c12,0,35-7,52-16c63-32,92,7,103,141c4,44,12,93,18,108c10,26,15,28,47,24c20-2,92-29,161-60c171-75,164-75,171-2c4,33,16,82,28,108c27,61,26,71-3,143-13,32-22,62-20,65s24,9,50,13c30,4,68,20,106,46c74,49,129,66,160,49c26-14,37-27,97-124c73-118,138-175,199-175c15,0,54,16,86,35s69,35,83,35c13,0,54-18,91-40c86-52,109-51,139,11c22,47,45,70,102,101l30,17-1,98c0,90,2,106,35,190c20,51,39,109,43,128c7,40,13,44,146,90c42,14,109,46,149,71s78,43,84,40c7-2,57-42,111-89c182-155,203-219,117-359-38-61-41-103-9-103c13,0,23,12,33,40c17,49,52,87,120,132c62,39,72,66,47,118-22,47-36,52-77,26-19-12-37-21-41-21-15,0-4,33,19,55c39,40,37,59-8,63-20,2-35,7-32,12c11,18-16,50-74,89-57,39-77,64-65,82c10,17,55,9,132-21c91-37,91-37,232,54l101,66-32,41c-40,51-85,72-128,59-37-10-37-8-11,36c21,33,21,33,1,43-30,16-49,13-56-9-6-20-6-20-33,0-15,12-43,31-62,43-21,13-39,36-46,55-16,51-27,56-61,28-19-16-42-53-58-93-31-79-66-128-95-136-31-8-33,7-9,63c12,28,19,54,15,57-3,4-27-3-51-15-25-12-48-22-50-22s7,17,21,37c17,26,23,45,19,64-5,22-2,28,17,33c13,3,32,6,44,6c27,0,57,33,52,57-2,10-18,23-38,30-34,11-132,15-177,6ZM3420,8420c24-47,24-50,6-50-13,0-36,48-36,76c0,23,9,16,30-26Z" fill="#939393"></path><path d="M6870,12610c0-28,21-70,35-70c15,0,45,32,45,48c0,12-50,42-70,42-5,0-10-9-10-20Z"></path><path d="M5957,12221c-3-11-17-22-36-26-17-4-31-11-31-17c0-12,58-68,70-68c19,0,40,33,40,61c0,54-32,91-43,50Z" fill="#939393"></path><path d="M7620,12184c-52-30-113-60-135-66s-48-18-57-26c-29-24-65-94-94-178-22-66-27-95-26-177l1-98-30-17c-75-41-109-87-123-164-4-21-10-38-13-38-4,0-50,25-104,55-53,30-109,55-125,55-15,0-48-13-73-29-65-41-101-46-154-23s-97,75-176,202c-54,88-60,95-87,92-50-6-77-30-72-63c6-38-3-43-49-30-22,6-41,7-46,2-17-17,84-111,228-214c175-126,271-220,315-311c30-60,34-79,40-188c6-95,11-124,24-133c12-9,16-28,16-72s7-76,26-118c25-55,26-63,18-144-5-47-8-133-8-191c0-98,2-110,33-176c38-84,85-133,161-171c34-17,60-39,68-55c16-35,41-174,44-253l3-60h-52c-46,0-56-4-88-35-20-19-81-100-135-180-107-158-145-201-203-225-59-24-136-144-137-211c0-40-13-51-79-65-54-11-62-20-75-80-3-15-24-51-46-80-22-30-43-63-46-74s4-58,15-105c12-47,21-117,21-156c0-52,7-87,25-132c28-70,31-123,11-202-19-76-40-273-32-304c8-32,32-45,104-54c56-7,57-8,57-40c0-51,24-58,99-33c34,12,65,21,69,21s4-26,1-58c-7-64,6-102,34-102c48,0,302,73,366,105c39,19,97,39,127,44s96,25,147,45c57,23,121,39,172,45c62,7,90,15,120,36c46,32,391,405,486,525c91,116,186,254,220,320c60,117,32,210-88,291-72,49-131,106-173,168-24,35-27,44-15,51c45,25,102,74,112,95c16,35,3,69-47,125-44,50-46,53-44,111c2,48-2,65-20,87-37,47-44,74-49,193-5,137,9,218,44,256c43,46,36,73-88,386l-91,227l39,63c21,34,64,111,96,171l57,108-41,67c-51,84-99,134-164,171-32,18-55,39-62,57-36,92-41,182-15,263c13,41,14,56,5,71-17,27-15,38,15,81c18,26,26,50,25,75-1,26,11,59,40,111c74,134,53,198-109,332-53,44-101,79-107,79-6-1-54-26-106-55Z" fill="#939393"></path><path d="M5800,12060c-6-10-13-40-16-65-6-38-4-45,10-45c24,0,66,45,66,70c0,52-39,79-60,40Z" fill="#939393"></path><path d="M5963,12054c-32-50-13-179,27-179c28,0,51,65,48,135-3,62-4,65-30,68-20,2-31-4-45-24Z" fill="#939393"></path><path d="M5646,11909c-27-21-62-118-52-145c13-34,96,9,96,50c0,13,7,29,15,36c27,23,13,80-21,80-6,0-23-9-38-21Z" fill="#939393"></path><path d="M6184,11659c-3-6,1-37,11-69l18-59-32-65c-27-56-30-69-19-86c11-16,10-25-4-47-32-53-46-55-123-22-38,17-99,37-135,44-44,10-70,21-79,35-17,25-37,26-46,3-3-10-11-58-16-107-10-93-37-172-64-182-9-4-39,6-67,21l-50,27-26-19c-26-20-56-71-113-196-26-57-35-69-60-74-16-3-32-10-35-15-3-4,11-38,31-74c25-45,35-73,31-88-3-13-33-65-66-115-78-120-107-178-124-251-18-75-25-84-84-106-82-30-83-33-98-211-15-184-27-235-94-392-64-154-67-163-38-176c13-6,31-30,42-56c21-53,17-95-14-147l-20-33-101,7-100,7-53-55c-69-71-94-136-108-282-11-119-4-444,13-581c11-85,19-102,86-184c36-44,41-57,37-84-10-54-38-101-66-115-33-15-32-12-12-99c17-74,14-179-7-246-7-21-30-56-51-78-28-28-38-48-38-70c0-18-7-37-15-43-11-8-18-43-24-122-13-160-42-204-99-151l-25,22l6-76c13-151,68-312,199-573c33-67,75-143,93-171s36-70,39-96c8-51-6-128-25-139-8-6,0-31,31-93c29-58,40-92,35-106-8-27,2-58,21-65c17-7,172,31,192,46c6,6,12,29,12,53c0,80,28,125,78,125c13,0,24,11,31,31l11,31l105-7c122-8,123-8,165,75c35,69,56,142,70,240c6,41,17,107,25,145c7,39,18,122,25,185c18,193,22,203,112,297c46,48,78,90,78,102c0,24,15,28,24,6c5-14,9-14,35,0c37,18,61,52,61,83c0,19,3,21,19,12c57-30,88,6,41,50-16,15-30,32-30,37s15,16,33,25c51,24,97,68,97,91c0,70-203,298-290,327-71,24-84,60-85,240c0,140,2,149,38,263c37,118,46,180,27,192-23,14-7,45,46,85c37,28,61,56,73,83c43,99,229,291,381,392c120,81,130,91,179,192c22,45,55,99,74,120c71,81,71,81,27,130-52,56-53,93-5,180c19,35,35,77,35,92c0,28,17,52,110,162c23,26,33,52,41,99c12,75,16,83,36,76c9-4,17,1,20,14c7,25,8,25,67-5c40-20,64-25,128-25s80,3,85,16c3,9-4,58-16,108-23,98-27,185-10,256c19,83,14,160-15,220-16,35-26,72-26,103c0,26-4,47-9,47-15,0-21,28-26,143-4,62-11,130-17,152-25,98-112,195-288,323-145,105-198,148-251,204-47,49-62,57-75,37Z" fill="#939393"></path><path d="M5133,11580c-7-10-33-28-58-39-33-15-45-26-45-41c0-23,17-22,73,7c15,7,27,11,27,9c0-3-13-27-30-53-41-64-40-77,8-68c20,4,37,8,37,8c0,1,8,23,17,49c13,36,14,56,7,90-13,54-21,63-36,38Z" fill="#939393"></path><path d="M5263,11565c-11-8-25-34-31-58s-21-52-32-62-20-30-20-45c0-35-17-50-59-50-68-1-161-60-148-95c13-31,69-15,124,37c17,17,36,27,41,24c6-3,31,10,56,29c26,19,48,35,51,35s-1-16-9-35c-24-57,3-44,99,48c83,80,86,85,83,123-4,52-34,58-71,15-32-38-37-39-37-2c0,39-20,55-47,36Z" fill="#939393"></path><path d="M6093,7623c-19-7-16-62,3-70c21-8,44,21,44,54c0,23-17,29-47,16Z" fill="#939393"></path><path d="M6636,7569c-29-23-33-34-12-42c18-7,66,29,66,49s-23,17-54-7Z" fill="#939393"></path><path d="M7229,7327c-14-8-62-16-105-19-83-5-156-32-168-63-3-8-26-24-50-35-59-25-72-49-56-106c7-24,19-49,26-55c19-16,17-26-5-32-26-7-19-31,28-93c38-51,76-68,87-40c9,23,41,20,55-5c6-13,8-39,5-64-9-56,11-75,57-56c61,25,83,24,139-5c29-16,85-59,124-96c39-38,77-68,83-68s23,7,36,16c17,11,36,14,58,10c42-8,91,23,118,73c17,32,17,35-3,85-46,114-19,272,70,422l42,69-123,6c-88,4-147,13-212,32-123,35-174,41-206,24Z" fill="#939393"></path><path d="M6621,7116c-18-21,3-56,34-56s52,35,34,56c-6,8-22,14-34,14s-28-6-34-14Z" fill="#939393"></path><path d="M6624,6949c-17-5-38-17-48-28-22-25-18-75,7-79c22-4,120,44,144,70c17,19,17,20-2,34-21,16-54,17-101,3Z" fill="#939393"></path><path d="M1072,6898c-11-29-25-78-33-108-14-62-30-86-62-94-28-7-57-55-57-94c0-52,16-79,50-85l31-7-24-32c-29-38-76-131-87-170-6-18-3-33,7-47c13-19,12-21-6-21-54,0-69-37-27-65c37-25,69-10,137,63c34,36,60,62,57,56-55-115-68-146-78-182-8-33-8-52,1-79c11-35,12-35,23-14c11,19,14,20,31,6c11-8,39-15,63-15h42l-6-54c-4-35-3-56,5-60c20-13,11-63-24-137-19-41-35-83-35-94c0-23,75-102,82-88c3,4,8,21,12,36c5,22,11,27,24,22c57-24,71-27,95-22c24,7,33,14,65,52c13,16,112,22,112,7c0-5-13-21-30-37-80-77-74-205,10-217c14-2,30-14,37-28c19-37,16-136-4-170-15-27-15-30,0-52c51-70,50-67,37-84-27-32-50-37-73-16-47,44-156,35-203-15-33-36-31-60,7-68c22-5,29-11,24-22-3-9,1-24,10-33c14-15,14-22-2-69-24-74-80-135-151-161-31-12-62-26-69-32-13-11-17-67-7-105l6-21l46,24c28,15,55,23,67,19c11-3,48-10,83-15c51-7,70-15,102-44c37-33,41-34,72-24c40,13,81,40,127,82l33,31-15-30c-25-49-75-113-102-131-14-9-60-20-102-25-60-7-87-15-118-37-65-45-248-273-232-288c4-4,39,7,79,24c99,43,116,45,167,27c66-23,77-20,105,28c14,24,37,53,50,66c32,30,94,38,133,17c17-8,49-18,72-22c37-6,41-4,41,14c0,28,18,31,265,42c222,10,265,17,332,56c39,22,83,67,83,84c0,4-26,11-57,14-111,13-143,44-84,78c16,9,31,26,33,39c2,15,24,38,62,64c134,94,155,246,41,296-64,28-149,28-180-1-18-17-30-20-55-15-42,9-47,28-16,68c66,86,31,164-95,213-63,24-66,30-37,61c36,39,68,94,68,119c0,35-35,69-109,108-39,20-77,47-86,59-15,20-59,154-85,256-14,53-84,132-155,172-42,24-61,29-123,29-74,0-149,21-138,39c4,5,23,15,44,21c103,34,180,101,96,86-19-4-42-10-50-13-32-12-11,14,38,47c67,46,119,113,173,224s76,193,54,206c-51,32-272,17-373-26-110-46-115-44-70,34c14,24,28,61,30,81c2,31,16,48,96,123c89,84,92,88,75,105-15,16-41,18-186,21l-169,3-20-53Z" fill="#939393"></path><path d="M7116,6730c-27-11-59-29-72-41-21-19-23-29-21-108c2-78-1-91-25-133-37-63-103-96-156-79-52,16-65,29-96,89-36,71-105,142-139,142-40,0-138-40-162-66-15-16-24-43-29-80-3-30-23-97-43-147-25-66-37-113-41-166l-5-75l46,28c118,68,141,76,228,76c46,0,157-7,246-16c162-16,162-16,203,5c22,11,42,21,45,21c2,0,25-18,50-40s53-40,61-40c30,0,79-34,155-106c43-41,82-74,87-74s22,10,36,21c18,14,49,24,89,28c34,4,73,14,87,24c33,23,89,95,96,124c14,55-25,171-65,193-18,9-19,18-14,99l6,89-42,30c-63,46-104,57-156,42-52-14-65-7-155,86-52,53-117,94-150,93-8,0-37-9-64-19Z" fill="#939393"></path><path d="M5895,6722c-55-34-112-116-129-185-7-30,9-107,23-107c18,0,59,41,75,74c9,19,16,55,16,80c0,46,5,55,59,99c24,19,25,50,1,54-8,2-29-5-45-15Z" fill="#939393"></path><path d="M4135,6574c-16-8-48-32-70-53-67-63-94-79-150-91-29-6-72-24-94-40-65-48-74-74-79-246-7-214,0-255,48-303c30-30,40-48,45-87c4-27,9-57,12-67c7-27,45-47,99-53c39-4,56-1,83,16c23,14,30,24,22,29-45,28-39,241,8,254c11,2,21,15,23,28c2,15,12,25,28,29c21,5,26,13,31,50c7,49,40,84,70,75c18-6,69,33,69,53c0,5-18,12-39,16-59,9-81,43-81,122c0,36,9,97,20,136c23,83,25,119,8,136-15,15-17,15-53-4Z" fill="#939393"></path><path d="M7058,6128c-25-20-31-20-135-9-59,6-181,11-270,12-180,0-197-4-252-66-25-29-31-44-31-83c0-59,24-156,50-197c26-42,88-75,141-75c57-1,126-32,141-65c9-19,9-37,0-75-6-27-9-55-7-62c3-7,25-26,50-41c24-16,54-44,66-63c31-50,84-74,165-74c61,0,68,2,95,31c15,17,45,35,64,40c74,21,145,108,160,196c6,36,12,45,43,60c23,11,39,27,42,43c4,16,16,28,35,35c40,12,42,15,25,25-9,6-14,24-13,51c1,24-6,57-17,78-43,85-154,181-208,181-15,0-40,15-64,40-22,22-43,40-47,39-3,0-18-9-33-21Z" fill="#939393"></path><path d="M7738,6012c-72-67-91-76-149-68-45,6-49,5-73-27-33-43-43-91-26-123c17-31,3-77-25-82-50-10-145-113-145-158c0-12-11-36-25-52-19-23-24-37-19-59c6-29,4-30-35-37-67-10-120-36-133-64-16-33-57-44-131-38-81,8-97-3-97-64c0-27,7-79,16-117c9-37,17-102,17-144c1-88-15-122-60-134-69-17-71-56-7-114c44-40,46-44,40-83-11-70,25-87,92-43c55,36,110,44,279,45c169,0,292-18,335-50c40-30,93-38,323-55c258-18,267-19,298-51c28-28,29-28,42,51c14,80,68,142,150,172c47,17,50,21,53,58c3,39-6,88-35,182-8,29-13,63-9,76c8,35,44,48,85,31c43-18,75-18,114,2c68,35,81,60,48,91-11,10-21,31-23,48-3,28-7,30-58,38-64,10-76,18-85,54-3,14-23,46-45,70-51,58-131,218-132,263c0,19,3,55,7,80c12,81-47,173-140,216-61,29-80,30-112,4-41-32-63-27-63,15c0,44-35,71-82,61-24-5-34-2-45,14-11,15-21,18-40,14-19-5-30-2-39,11-12,16-17,13-66-33Z" fill="#939393"></path><path d="M4520,6016c-59-22-155-73-170-91-11-14-11-24,4-65c10-27,15-53,12-59-13-20,174-154,191-137c3,3-2,17-11,30-22,35-20,43,14,61l30,16-22,29c-29,40-17,82,27,90c28,5,30,9,29,47-1,47-26,93-52,92-9,0-33-6-52-13Z" fill="#939393"></path><path d="M522,5745c-99-50-102-53-136-120-29-57-21-63,67-47c72,14,111,47,151,127c45,93,35,99-82,40Z" fill="#939393"></path><path d="M6299,5708c-47-49-46-54,11-49c14,1,31,9,38,18c13,18,17,70,5,75-5,2-29-18-54-44Z" fill="#939393"></path><path d="M5060,5735c0-19,36-55,55-55c20,0,19,12-6,44-22,29-49,35-49,11Z" fill="#939393"></path><path d="M742,5720c-57-23-201-146-237-203-17-27-17-28,9-65c47-65,67-86,74-76c26,39,87,104,97,104c7,0,18-14,25-31c16-39,75-79,117-79c19,0,43,10,61,25c53,44,78,145,36,145-17,0-30,29-39,84-4,26-18,51-40,73-34,34-60,40-103,23Z" fill="#939393"></path><path d="M3844,5604c11-16,31-46,45-68l25-39-32-27c-37-31-39-36-12-43c11-3,20-13,20-22c0-34,125-177,200-229l25-18-35,7c-40,8-106,40-115,55s-74,46-114,55l-33,7l3-57c3-44,0-60-12-68-23-15-86,0-92,22-8,30-135,44-171,18-16-12-16-19-6-77c22-120-10-236-69-250-37-9-36-25,4-56c32-24,36-32,31-58-10-48-54-96-112-122l-54-24v-57c0-32-7-88-17-124-16-65-16-67,6-130c59-162,55-145,33-180l-20-32l29-61c16-34,29-77,29-95c0-57,35-83,199-147c80-32,147-58,148-59c2-1-11-27-28-58-36-67-87-204-99-265-10-56-2-59,104-38c113,22,186,23,198,3c6-11,17-15,36-11s51-7,111-37l84-42l96,17c53,10,143,28,201,42c127,29,169,30,220,4c47-24,49-19,20,65-11,33-17,68-14,82c4,14,47,59,100,105l94,81-123,127c-130,136-188,218-189,271-1,26,6,39,34,63c47,40,255,149,338,175c82,27,135,62,156,103c21,40,15,110-21,258-33,138-61,206-104,253l-35,39l18,46c43,114,40,195-10,294-27,54-54,72-93,65-17-4-37,1-53,11-116,79-122,81-147,75-45-10-184-86-224-122-34-31-41-33-83-27-90,12-111,48-49,85c61,36,47,46-79,54-48,4-73,10-82,21-6,9-25,16-41,16-42,0-48,11-18,34c49,39,5,73-126,96-35,6-75,14-89,17l-24,6l18-29Z" fill="#fff"></path><path d="M5610,5564c-107-32-162-56-225-100-30-20-116-57-205-89-85-30-163-63-174-74-18-19-19-24-7-91c14-78,9-125-20-182-25-49-24-67,5-97c62-65,120-247,136-426c10-109,16-135,34-135c6,0,30-17,53-39c29-26,62-44,102-55c32-9,71-26,86-38c27-21,27-22,6-29-29-11-27-23,14-64c52-51,93-43,78,16-6,20-4,21,23,15c91-21,329-159,380-219c37-45,50-50,78-32c31,20,46,13,104-49c24-25,49-46,57-46c7,0,39,14,70,30c50,26,67,30,139,30c95,0,156-18,263-76c39-22,75-36,79-31c4,4,0,23-9,42-37,77-27,94,165,291c118,121,117,119,75,200-32,62-49,134-62,253l-13,123-41,42c-23,23-41,46-41,52c0,5,23,32,51,59c28,28,59,67,70,87c19,37,19,38-6,155-24,116-77,295-94,321-15,24-161,33-447,28-154-3-304-8-334-11-48-5-62-2-110,22-46,23-57,35-68,68-27,84-65,92-212,49Z" fill="#fff"></path><path d="M4750,5520c0-6,7-26,14-45c16-37,38-39,56-5c8,15,4,23-16,39-29,23-54,27-54,11Z" fill="#939393"></path><path d="M373,5454l5-47-65,7c-60,6-65,5-70-14-5-20-6-20-29,5-27,29-55,32-94,9-27-17-60-62-60-83c0-6,13-11,29-11c78,0,82-39,11-110-27-28-50-55-50-60c0-22,53-42,134-50c47-5,91-12,97-15c18-12,6-31-41-67-34-26-46-41-48-66-3-27,1-34,23-42c14-6,40-10,58-10c40,0,27-11-48-39-87-32-105-46-105-82c0-42-22-81-72-124-24-20-35-34-26-31c10,3,40,8,68,12c47,6,50,5,50-16c0-13,8-24,20-27c14-4,20-14,20-34c0-23,4-29,23-29c31,0,140,53,166,81c15,17,31,22,55,21c27-2,44,6,81,38c55,47,69,55,115,65c19,4,45,16,56,27c21,19,24,19,54,3c42-21,53-11,81,73c57,173,24,417-71,527-21,25-42,55-46,67-6,21-10,19-60-37l-53-59-62,67c-61,67-103,97-135,97-14,0-16-8-11-46Z" fill="#939393"></path><path d="M3260,5110c-55-13-78-53-72-123c1-10,15-29,31-43c33-28,64-97,56-125-11-34-64-69-104-69-57,0-75,26-79,113-2,40-5,78-7,84-8,25-33,1-44-40-5-24-37-97-70-164l-60-122l82-17l81-18-68-32c-38-18-70-34-72-36-1-2,28-2,67,0c66,4,72,3,137-37c37-22,82-46,101-52c31-11,36-10,54,12c16,20,18,33,13,79-13,108-15,100,36,120c64,24,101,52,123,94l19,36-32,33c-39,40-39,47-6,78c39,35,84,109,84,137c0,32-48,78-96,91-45,12-123,13-174,1Z" fill="#fff"></path><path d="M8800,4773c-8-3-23-12-32-21-12-10-29-13-56-8-31,4-45,1-64-14-30-23-95-39-159-40-70,0-144-26-172-60-19-22-27-46-32-97-12-110-36-132-74-67-21,36-23,36-69,30-35-5-62-1-109,16-61,21-63,21-96,3-28-15-39-16-69-6-19,6-83,16-142,21-90,8-116,14-159,39-29,16-75,34-103,40-87,18-254,24-344,12-71-9-93-17-136-46-28-19-56-35-62-35-20,0-34-41-28-82c4-22,21-67,38-101c25-50,31-73,30-120-2-70-3-72-48-93-37-18-147-131-196-202l-30-44l16-63c24-97,23-105-18-98-31,5-37,2-55-27-46-76-31-164,35-202c52-30,181-58,269-58s140-13,149-36c17-43,274,35,338,103c43,47,76,57,178,57c147-1,302-51,378-122c30-28,32-35,32-95c0-64,0-64,33-73c29-9,33-15,43-64c12-61,25-90,48-110c10-7,16-28,16-51c0-34,4-41,28-50l27-11-30-14c-16-7-49-13-71-14-34,0-43,4-47,21-5,17-9,19-25,10-38-20-182-261-182-303c0-18,4-20,33-14c57,10,210,93,278,150c75,62,103,97,121,152c12,35,19,41,68,58c33,11,85,19,130,20c63,1,80-3,108-22c38-28,40-44,7-62-14-7-25-17-25-21c0-13,60-27,165-39c209-25,220-69,42-157l-78-39l75-48c42-26,81-56,86-66c6-10,10-47,10-82c0-103,16-108,146-43c49,24,97,45,106,45c31,0,64,21,82,52l18,30l78-7c84-7,133,7,142,42c12,47-11,53-112,26-36-9-77-13-90-10-14,3-53,33-86,67-37,35-70,60-83,60-46,0-19,69,56,142c41,41,70,56,190,103c78,30,152,55,165,55s39,11,58,24c20,13,73,36,120,51c117,39,136,49,143,82s97,137,138,158c17,9,52,15,89,14c76-2,87,8,102,88c9,51,9,67-5,102-29,71-17,125,44,202l32,40-24,25c-51,55-331,163-386,149-17-4-29,4-55,36-102,127-111,130-191,79-59-37-69-37-114-2-30,22-46,27-87,25-28,0-59,3-69,9-23,12-49,71-41,92c10,25-3,59-37,102-40,50-51,56-115,59-30,1-60,8-68,14-24,20-38,108-25,146c14,37,3,75-33,121-32,40-123,79-158,67Z" fill="#939393"></path><path d="M2945,4454c-91-37-93-37-191-18-64,12-140-51-132-109c3-20,8-22,55-19c51,2,53,2,72-35c24-47,42-64,108-97c60-30,88-65,81-101-3-14-2-28,3-31c11-6,45,11,82,42c34,29,47,30,47,6c0-36,52-123,88-147c68-46,108-26,99,47-8,54,12,114,36,112c27-3,50,39,42,75-8,37-48,81-73,81-27,0-39,17-47,70-9,54-25,75-86,105-25,13-51,31-58,39-18,21-22,21-126-20Z" fill="#fff"></path><path d="M2486,4330c-48-24-65-47-66-86-1-111-66-198-205-272-84-45-90-51-93-83-5-53-16-59-101-59-102,0-175,20-202,54-11,15-38,36-60,46-45,23-48,18-24-49c8-24,22-82,30-129c9-48,19-95,21-104c5-15-1-18-38-18-45,0-147-14-185-26-17-5-33,5-76,45-58,55-68,59-88,35-23-28-72-47-148-55-44-5-81-15-90-24-14-14-12-18,23-47c38-31,38-32,33-90l-5-58h33c18,0,71-16,117-36c45-20,115-44,153-53c65-16,70-19,70-45c1-19,14-39,43-66c33-31,42-46,42-73c0-52,48-115,132-173l73-50-3-70c-10-238-46-491-91-634-26-83-26-87,4-94c18-5,25-13,25-31c0-54,127-95,293-95c182,0,282-22,346-76c39-32,100-41,156-22c42,14,58,36,75,105c13,52,59,99,140,142c85,46,130,43,310-15c80-26,157-49,171-51c34-6,69,12,155,84c39,32,85,66,102,75c30,16,72,71,72,93c0,7-14,9-34,7-26-3-41,3-70,29-49,42-66,78-66,136-1,26-7,59-15,73-22,38-18,47,26,77c45,30,45,30,8,126-18,48-20,63-11,78c17,27,15,49-10,86-29,42-49,41-118-2-30-18-56-32-58-31-1,2,7,19,18,39c14,23,19,44,15,60-5,20,0,30,28,51c19,15,38,38,41,51c4,14,27,48,52,76c24,28,47,63,51,79c3,20,14,32,33,39c34,11,49,38,83,148c15,44,38,110,52,145c36,84,44,114,36,124-3,5-33,19-66,30-33,12-114,44-181,72-66,27-147,56-180,63-41,9-83,30-139,68-89,60-132,81-169,81-30,0-39,12-46,65-5,37-7,40-47,47-56,9-98,42-124,95l-21,43-49-6-50-7-16,42c-14,36-20,41-47,41-17-1-48-9-70-20Z" fill="#fff"></path><path d="M5000,4301c-151-41-349-138-395-193-31-36-28-62,13-121c67-99,267-299,332-332c45-23,57-19,121,42l60,57l47-13c26-8,70-20,97-28c75-22,245-30,259-12c7,9,29,14,57,14c58,0,124,41,145,91c11,25,32,46,74,72c76,47,79,69,14,115-61,44-243,137-267,137-11,0-32-11-49-25-16-14-34-25-39-25-18,0-109,93-115,117-8,29-40,46-118,64-44,11-60,19-67,37-7,19-16,22-56,21-27,0-77-8-113-18Z" fill="#939393"></path><path d="M3286,4053c-18-46,1-139,30-150c22-8,54,31,54,66c0,55-69,124-84,84Z" fill="#fff"></path><path d="M5961,3883c-28-22-36-24-53-14-12,7-32,10-50,6-36-8-98-61-98-84c0-36-119-120-171-121-28,0-68-40-74-74-12-64,49-157,130-196c41-20,49-20,125-9c80,11,110,26,110,55c0,18,31,31,92,39c25,3,52,13,59,21c8,10,27,15,53,14c64-3,65-2,106,42c32,35,46,43,87,48c67,7,161-5,182-24c28-25,57-19,88,19c26,32,90,172,82,178-2,2-35,17-74,34-154,67-251,69-360,8-81-45-104-43-122,9-16,47-40,76-62,76-9,0-31-12-50-27Z" fill="#939393"></path><path d="M5070,3665c-63-52-85-60-124-46-55,21-78,13-164-54-90-71-94-80-67-155c18-52,19-97,3-103-7-2-29,2-48,10-48,20-104,18-202-6-46-11-123-28-173-36-49-9-103-19-118-22-17-3-44,2-67,12-55,25-70,16-70-40c0-36,6-52,26-72c26-26,31-26,106-8c20,5,34,1,54-14c33-26,54-26,96-1c33,19,158,52,207,54c18,1,33-10,55-41c37-50,84-74,191-98c119-26,229-24,361,7c204,48,263,91,265,193c2,82,9,98,63,123l49,24-6,61c-8,79-33,163-56,186-11,11-40,20-77,24-32,3-86,15-118,27-92,32-122,28-186-25Z" fill="#fff"></path><path d="M6278,3581c-22-5-55-24-82-49-41-38-51-42-96-42-27,0-50-4-50-9c0-12-56-31-90-31-26,0-60-26-60-47c0-22-66-38-156-38-84,0-94,2-133,29-23,16-43,27-44,25-2-2-11-17-21-32-10-16-33-35-52-43-27-11-34-19-29-33c3-10-1-24-10-31-8-7-22-38-31-68-22-76-14-150,23-202c37-54,152-130,253-169c75-29,83-31,108-17c84,47,120,56,395,106c169,30,167,29,196,135c24,91,218,345,262,345c36,0,32,24-11,62-40,36-118,68-164,68-11,0-29,9-41,20-24,22-109,33-167,21Z" fill="#939393"></path><path d="M7572,3548c-33-7-42-13-38-25c12-32,170-289,201-328c41-52,43-61,56-250c5-88,14-164,19-169c17-17,58,34,110,136c28,54,59,102,70,108c10,5,38,7,62,4c34-5,48-2,61,11c22,22,22,52-1,59-10,3-30,31-45,62-16,31-46,78-68,104-45,53-47,67-18,104c26,33,19,55-21,63-17,3-35,14-41,24-7,14-21,19-48,19-25,0-41,5-44,15-8,20-72,50-135,64-60,12-61,12-120-1Z" fill="#939393"></path><path d="M7425,3484c-38-30-160-83-239-104-76-19-81-19-104-2-54,38-67,42-107,37-22-3-78,2-123,10-46,9-93,13-105,9-12-3-45-24-74-46s-56-37-62-34c-13,8-113-149-171-269-56-114-70-131-157-174-35-17-63-33-63-35c0-1,18-21,40-44c22-22,40-48,40-57c0-33,31-75,70-95c43-22,65-53,56-77-17-43,72-102,155-103c77,0,137-30,94-46-24-10-18-27,25-69c27-26,40-48,40-66c0-28,19-39,70-39c14,0,53-10,85-21c53-19,74-21,185-16c147,7,177,14,290,70c77,38,92,42,155,41c92-1,182-28,214-65c20-22,34-29,63-29c41,0,58,19,58,66c0,68,66,264,89,264c5,0,17-10,26-22c14-22,17-22,42-8c15,9,38,31,50,49c21,30,22,37,9,55-19,30-77,33-120,7-47-29-116-28-143,2-29,32-31,42-48,215-9,86-21,175-26,197-22,80-164,331-220,388-31,30-64,34-94,11Z" fill="#939393"></path><path d="M3805,3319c-114-14-187-31-235-54-57-29-143-119-159-168-8-24-23-43-42-52-51-27-32-49,41-50c39,0,47-4,65-33c63-102,57-97,112-97c63,1,99,19,112,56c10,28,63,69,89,69c7,0,19-15,27-33c8-19,21-39,29-46c23-19,59,7,97,69c17,28,36,50,42,50c7,0,23-9,37-20s30-20,35-20c15,0,81,56,105,90l21,30-45-6c-42-6-48-4-80,28-33,33-56,89-56,136c0,13-5,32-10,43-12,21-57,23-185,8Z" fill="#fff"></path><path d="M4392,3131c-18-5-49-20-70-34-28-19-46-24-73-20-34,5-37,3-44-25-3-17-17-38-31-46-13-9-24-25-24-36c0-26-40-45-75-36-15,4-38,18-53,33l-26,26-27-31c-26-29-49-87-49-124c0-32-25-19-92,47-74,74-98,82-98,32c0-49-27-67-127-89-48-10-92-23-97-28-7-7-3-25,12-55c12-25,22-52,22-59c0-8-18-29-40-46s-40-36-40-41s13-30,30-57l29-47-21-17-22-16l26-39c25-38,79-73,111-73c21,0,38-25,31-44-13-34,32-14,125,57c52,39,101,76,108,80c19,12,191-72,240-117c42-38,66-94,82-193c9-61,27-86,171-242c114-124,234-232,290-261c19-10,62-23,95-30c93-19,128-37,178-90c26-27,59-52,74-56c52-11,68-25,98-82c24-46,39-61,80-82c36-18,56-37,74-69c29-52,69-168,82-235c8-45,7-53-17-87-29-43-53-103-54-137c0-27,37-46,58-29c27,22,74,100,90,149c14,44,24,56,62,78c39,23,45,31,48,64c3,35-1,43-58,96l-61,59l16,36c8,20,38,66,66,101c60,75,77,79,155,35c48-28,106-84,117-113c3-10,10-8,27,8c21,20,21,23,6,52-23,45-119,119-270,208-157,93-213,131-221,152-3,8,4,25,17,39c35,37,13,48-100,48-94,0-100,1-156,35-76,45-137,123-176,225-68,176-98,215-203,266-45,22-47,22-61,4-25-34-43-12-50,62-18,180-18,200-7,207c14,9,14,58-1,107-18,62-4,80,102,124c51,21,99,45,106,53c18,18,18,112,0,156-12,29-22,36-82,55-65,19-83,29-146,74-30,21-109,30-156,18Z" fill="#fff"></path><path d="M5241,3055c-68-22-184-45-310-60-96-13-113-58-60-163c47-94,96-124,134-82c23,25,46,25,96-1c51-25,63-21,63,22c1,29,6,36,39,51c20,10,37,24,38,31c0,6,1,27,2,46c2,30,10,41,60,79c122,93,95,127-62,77Z" fill="#939393"></path><path d="M5323,2956c-39-18-57-49-49-87c7-34-1-59-19-59-7,0-25-20-40-46-40-68-107-82-147-31-14,18-19,19-32,8-25-21-19-56,19-102c44-52,51-64,59-110c4-22,23-55,47-83c36-41,40-50,35-81-6-31-3-39,37-78c65-66,124-96,203-106c38-5,70-8,70-7c1,0-39,60-90,132-96,137-156,246-156,283c0,12,5,31,10,42c10,17,22,19,118,19c178,0,426-27,485-52c28-12,52-18,54-13c16,50,40,80,63,80c35,0,39-32,5-45-22-8-24-13-15-29c5-11,15-23,20-26c15-9,11-67-5-89-26-34-18-67,28-114l42-43-35-29-35-28l28-26c23-21,26-29,17-46-6-12-21-20-35-20-16,0-33-12-51-35-18-24-34-35-47-33-16,2-23-5-29-31-6-21-17-35-30-39-17-4-19-10-14-45c8-46,73-150,97-155c10-2,36,17,60,44c24,25,54,50,66,55c51,19,169-47,180-102c3-17,12-33,20-36s44,8,81,25c49,23,93,34,162,42c113,12,131,26,123,90-5,37-2,43,41,85c49,49,55,62,31,71s-72,91-85,143c-10,41-9,54,4,80c18,34,21,118,6,141-9,13-14,11-33-12-13-16-26-28-29-28-4,0-36,20-71,45-44,30-68,55-76,77-25,66-43,94-84,124-30,23-47,45-59,80-10,29-34,65-58,89-36,35-46,40-88,39-60,0-154-21-178-39-18-13-18-15-1-81c15-58,15-70,4-82-24-24-47,11-47,72c0,51-12,76-36,76-6,0-14-9-17-20-12-46-134-12-307,85-130,72-168,83-217,61Z" fill="#939393"></path><path d="M5287,2633c-14-14-6-56,22-112c50-98,166-263,225-319c31-30,56-62,56-71c0-33,58-99,131-151c40-27,78-50,84-50c9,0,11,13,8,44-8,72,56,167,101,150c13-5,15,1,13,33-2,36,0,38,28,41c56,5,59,9,35,46-14,24-20,48-18,76c1,30-3,45-14,51-34,19-29,109,7,109c16,0,31,42,20,59-4,7-22,9-44,5-28-4-49,0-79,15-53,27-104,37-275,56-183,20-176,20-188-15-6-16-13-30-15-30-3,0-18,16-35,35-30,34-48,42-62,28Z" fill="#939393"></path><path d="M6656,2329c-18-14-26-30-26-52c0-42,54-135,91-155c47-27,36-92-17-92-31,0-41-17-48-90-8-81,4-121,49-171c35-39,39-50,35-101-1-21,5-31,24-39c21-10,42-8,111,9c110,28,148,28,230-3c86-33,174-35,238-7c35,15,51,31,72,70c45,82,144,117,215,76c33-20,56-14,71,20c16,34-8,81-41,81-30,1-30,26,1,65c18,22,43,72,84,168c10,22,29,39,59,54c64,31,70,67,12,68-11,0-65,21-120,48-93,43-107,47-176,47-71,0-79-2-165-50l-90-50-175,1c-260,1-373,24-377,74c0,14-1,31-2,38-1,18-25,15-55-9Z" fill="#939393"></path><path d="M450,2202c-22-10-36-26-38-39-5-36-48-63-102-63-47,0-69-14-83-52-3-10,7-42,25-75c18-32,37-85,43-118l11-60h60c47,0,63-4,81-22c33-33,98-39,153-14s142,28,164,5c9-8,16-26,16-39c0-12,9-33,19-46c22-28,18-44-35-124-32-47-38-66-44-133-4-48-14-88-25-105s-15-37-12-55c6-31-20-99-46-121-23-19-21-45,6-89c38-61,39-69,6-131l-31-59l21-47c27-60,26-67-3-94-14-13-32-39-41-58-15-31-15-36-1-59c9-13,42-37,74-53c71-36,97-64,161-173c51-87,99-135,126-124c8,3,21,20,31,38c26,52,53,76,103,92c72,24,223,45,371,52c159,8,183,16,245,89c53,62,108,102,159,116c27,7,37,17,42,37c12,48,42,99,100,167c65,77,66,88,14,200l-32,70l97,140c54,77,111,164,127,193c36,62,71,85,215,137c111,40,208,101,248,155c35,47,35,150-1,150-7,0-18-9-24-20-9-17-21-20-78-20-40,0-79,6-96,15-16,9-45,14-65,13-31-3-36,0-45,27-6,17-15,33-21,37-5,4-57,8-115,8-217,0-365,33-439,97-60,50-111,60-410,73-239,11-350,23-446,49-22,6-97,10-166,10-108,0-134,3-172,20-56,26-101,27-147,3Z" fill="#fff"></path><path d="M3878,1909c-21-15-28-29-28-54c0-64,22-190,36-204c12-13,17-12,40,10c60,56,95,173,70,233-14,32-19,36-53,36-22-1-49-9-65-21Z" fill="#fff"></path><path d="M6049,1898c-42-14-54-55-35-119c20-65,21-248,2-301-11-30-11-43,0-75c8-21,14-50,14-65c0-19,10-33,33-49c44-30,67-60,67-86c0-13,4-23,9-23c16,0,77,78,111,141c17,33,38,63,46,66c22,8,17,27-28,114-42,79-43,84-43,177c0,70-5,105-17,127-35,65-111,110-159,93Z" fill="#939393"></path><path d="M6392,1809c-12-12-25-20-28-16-15,14-62-25-88-73-33-61-36-104-12-157c20-45,56-70,106-73c66-5,87,0,134,32c29,18,69,35,100,39c92,15,124,94,73,183-33,60-75,79-177,84-81,4-89,3-108-19Z" fill="#939393"></path><path d="M342,1758c-18-5-36-16-39-24s2-45,12-81c38-140-7-418-96-585-23-44-29-68-27-100c2-30,7-42,17-40c25,5,77-18,104-46c25-26,27-32,18-78-16-89-23-218-12-245c7-21,20-29,60-39c86-20,117-17,151,15c24,23,30,37,30,70c0,28,10,62,30,98c35,65,37,87,13,128-17,29-17,31,10,78c36,65,34,90-12,169-21,37-40,71-40,76-1,5,20,16,46,25l48,16v55c0,36,6,64,18,80c11,16,17,44,17,85c0,59,9,84,61,175c25,44,20,102-12,136-30,32-95,33-130,3-21-18-34-20-98-17-59,3-76,8-90,24-22,27-40,32-79,22Z" fill="#939393"></path><path d="M7503,1755c-44-19-67-56-58-95c5-21,2-39-9-55-34-52-9-156,44-185c31-17,58-7,118,44c63,54,98,65,245,74l112,8-65,31c-75,36-96,53-136,108-37,51-44,56-70,50-11-2-37,4-57,15-43,23-79,25-124,5Z" fill="#939393"></path><path d="M9065,1759c-22-4-75-8-118-8-169-2-428-100-523-198l-44-47-88,13c-107,16-285,26-307,18-37-15,50-87,105-87c39,0,19-19-42-39-82-28-98-38-79-50c20-13-16-17-224-30-207-12-287-32-335-87-25-29-30-43-28-72l3-37l78,2c42,2,77,1,77-2c0-2-9-19-20-38l-21-35l36-42c19-23,35-45,35-49s-11-22-25-41-25-35-25-37s12-15,26-28c15-14,22-25,16-25-17,0-42-30-42-52c0-14,12-24,40-35c34-14,40-21,40-45c0-16-6-31-15-34-24-9-18-24,30-75c24-26,47-58,50-71c6-23,9-24,53-17c76,13,81,11,131-36c27-25,58-45,70-45c14,0,28-11,39-31c50-92,100-118,182-93c49,14,110,69,110,99c0,32,24,65,47,65c67,0,261-88,345-156c59-49,89-54,168-30c85,26,137,54,189,100c28,25,63,49,77,52c38,10,112-1,133-20c25-23,43-20,86,14c46,37,69,44,95,30c28-15,25-39-10-91-53-79-33-163,26-108c37,34,54,72,54,119c0,23,5,50,10,61c13,23,54,25,90,4c35-20,72-19,169,7l83,22l97-22c53-12,106-22,119-22c12,0,71,16,130,35c142,45,189,55,304,65c63,5,107,14,127,26c29,17,32,17,60,1c26-15,32-15,65-2c27,11,77,15,205,15c109,0,172,4,176,11c13,20-6,63-42,95-33,31-35,36-25,59c24,52,10,186-34,313-16,47-12,62,14,62c36,0,62,29,62,70c0,44-18,60-69,60-54,0-77,16-99,68-25,58-27,75-10,102s-7,71-81,148c-66,69-88,76-199,62-94-12-129-24-207-66-106-58-217-77-309-52-36,9-62,8-145-6-127-23-188-16-346,35-66,21-131,39-144,39-18,0-41,17-78,57-41,44-56,54-65,45-17-17-69-15-96,4-13,9-34,33-48,55-26,42-35,44-109,28Z" fill="#939393"></path><path d="M6910,1614c-25-8-78-18-119-23-57-7-78-14-90-30-12-15-34-23-84-30-64-9-121-34-147-66-8-9-30-15-55-15-59,0-75-8-75-36c0-13-13-38-29-57-16-18-33-48-38-67-7-24-16-36-34-40-22-6-24-11-23-62c2-88,58-172,126-188l33-8-32-7c-49-11-57-26-38-71c24-58,37-63,157-64c59,0,131-5,160-11c68-14,223-89,275-134c22-19,43-32,46-29c10,10-12,75-36,107-25,32-69,65-192,143l-60,37l33,9c33,9,33,9,17,34-9,14-15,35-13,47c3,19,9,22,46,20c35-2,43,1,40,14-2,9-17,20-35,25-31,8-34,13-48,72-3,17-15,42-26,57-10,15-19,37-19,48c0,25,21,77,43,106c15,19,16,19,23-10c10-44,33-65,70-65c61,0,81,14,88,63c4,25,16,53,27,62c23,22,180,54,260,55c30,0,79-7,108-16c29-8,69-14,89-12c35,3,37,5,35,38-1,19-8,39-17,46-9,6-55,14-103,17-49,4-126,18-172,32-96,28-127,30-191,9Z" fill="#939393"></path><path d="M3843,1479c-59-28-63-32-63-64c0-19,7-60,15-92c19-74,19-129-2-205l-17-61l39-34c21-18,45-33,52-33c8,0,26,14,40,31c14,16,32,28,39,25c29-11,65,81,79,202c12,107-46,262-98,262-12,0-50-14-84-31Z" fill="#fff"></path><path d="M6485,798c-11-6-44-29-73-51l-52-40l60-63c58-60,71-86,50-99-15-9-12-61,4-74c11-10,20-10,36-1c31,17,46,7,75-50c14-27,29-50,33-50c5,0,16,17,26,37l18,38l19-24c11-13,25-21,34-17c24,9,18,71-16,148-17,38-28,72-25,76c3,3,28-5,54-17c56-26,105-25,110,3c3,15,0,18-18,13-16-4-33,4-63,32-60,53-105,85-162,113-68,35-87,39-110,26Z" fill="#939393"></path><path d="M4720,745c-8-9-26-15-46-13-19,1-40-4-46-11-30-30,154-154,277-186c66-17,98-35,120-69c9-13,30-30,46-36c26-11,34-10,57,7c34,25,38,51,18,111-17,52-12,82,28,157c33,62,37,61-149,40-113-12-138-12-190,0-77,18-100,18-115,0Z" fill="#fff"></path><path d="M6890,92c0-12,46-27,107-36c23-3,63-17,89-31c83-44,219-25,161,23-29,24-357,65-357,44Z" fill="#939393"></path></g></svg>`;
});
const css = {
  code: ".parallax-bg.svelte-ghzp5k{transition:transform 0.5s ease-out}.scroll-indicator.svelte-ghzp5k{opacity:0.5;transition:opacity 0.3s ease, transform 0.3s ease}.scroll-indicator.active.svelte-ghzp5k{opacity:1;transform:scale(1.5)}.section.svelte-ghzp5k{transition:background-color 1s ease}@keyframes svelte-ghzp5k-truckMove{0%{transform:translateX(0);opacity:0.3}70%{transform:translateX(65vw);opacity:1}100%{transform:translateX(90vw);opacity:0}}@keyframes svelte-ghzp5k-truckMove1{0%{transform:translateY(100vh);opacity:1}20%{opacity:1}80%{transform:translateY(20vh);opacity:1}100%{transform:translateY(0);opacity:1}}.truck-animation.svelte-ghzp5k{animation:svelte-ghzp5k-truckMove 2s ease-in-out 1s forwards}.truck-animation1.svelte-ghzp5k{animation:svelte-ghzp5k-truckMove1 2s ease-in-out 1s forwards}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { browser } from \\"$app/environment\\";\\nimport { MapPin, ChevronDown, LogIn } from \\"lucide-svelte\\";\\nimport * as Card from \\"$lib/components/ui/card/index.js\\";\\nimport { onMount } from \\"svelte\\";\\nimport AOS from \\"aos\\";\\nimport Logo from \\"$lib/components/Logo.svelte\\";\\nimport Eumap from \\"$lib/components/Eumap.svelte\\";\\nlet currentSection = 0;\\nlet isScrolling = false;\\nlet lastScrollTime = 0;\\nlet departInput;\\nfunction handleScroll(event) {\\n  event.preventDefault();\\n  const now = (/* @__PURE__ */ new Date()).getTime();\\n  if (now - lastScrollTime < 1e3 || isScrolling) return;\\n  isScrolling = true;\\n  lastScrollTime = now;\\n  if (event.deltaY > 0 && currentSection < 2) {\\n    scrollToSection(currentSection + 1);\\n  } else if (event.deltaY < 0 && currentSection > 0) {\\n    scrollToSection(currentSection - 1);\\n  }\\n  setTimeout(() => {\\n    isScrolling = false;\\n  }, 1e3);\\n}\\nfunction updateParallax() {\\n  const parallaxElements = document.querySelectorAll(\\".parallax-bg\\");\\n  parallaxElements.forEach((el) => {\\n    const speed = 0.5;\\n    const yPos = -(window.scrollY * speed);\\n    el.style.transform = \`translateY(\${yPos}px)\`;\\n  });\\n}\\nfunction updateScrollIndicators() {\\n  const sections = document.querySelectorAll(\\".section\\");\\n  sections.forEach((section, index) => {\\n    const rect = section.getBoundingClientRect();\\n    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {\\n      currentSection = index;\\n    }\\n  });\\n}\\nfunction onScroll() {\\n  updateParallax();\\n  updateScrollIndicators();\\n}\\nfunction scrollToSection(sectionIndex) {\\n  const sections = document.querySelectorAll(\\".section\\");\\n  if (sections[sectionIndex]) {\\n    const yOffset = 0;\\n    const y = sections[sectionIndex].getBoundingClientRect().top + window.pageYOffset + yOffset;\\n    window.scrollTo({ top: y, behavior: \\"smooth\\" });\\n  }\\n}\\nfunction scrollToSection1() {\\n  scrollToSection(0);\\n}\\nfunction scrollToSection2() {\\n  scrollToSection(1);\\n}\\nfunction scrollToSection3() {\\n  scrollToSection(2);\\n}\\nonMount(() => {\\n  if (browser) {\\n    AOS.init({\\n      duration: 1e3,\\n      once: false,\\n      mirror: true\\n    });\\n    window.addEventListener(\\"scroll\\", onScroll);\\n    window.addEventListener(\\"wheel\\", handleScroll, { passive: false });\\n    if (departInput) departInput.focus();\\n    return () => {\\n      window.removeEventListener(\\"scroll\\", onScroll);\\n      window.removeEventListener(\\"wheel\\", handleScroll);\\n    };\\n  }\\n});\\n<\/script>\\n<svelte:head>\\n  <link rel=\\"stylesheet\\" href=\\"https://unpkg.com/aos@next/dist/aos.css\\" />\\n</svelte:head>\\n\\n<main class=\\"w-full text-amstram-white font-sans\\">\\n  <div class=\\"section min-h-screen flex flex-col relative transition-colors duration-1000\\">\\n    <img src=\\"/side.webp\\" alt=\\"Décoration latérale\\" class=\\"absolute left-0 top-20 h-full object-cover hidden md:block parallax-bg\\" style=\\"z-index: -1;\\" />\\n    <header class=\\"flex justify-between items-center p-4 max-w-7xl mx-auto\\">\\n      <div class=\\"absolute left-0 top-0 mt-5 ml-10\\">\\n        <Logo />\\n      </div>\\n      <div class=\\"absolute right-1 top-3 md:top-9 mt-10 flex items-center space-x-4 md:mr-20 mr-1 md:mt-5 mt-14\\">\\n        <button class=\\"flex items-center space-x-1 bg-amstram-purple px-3 py-1 rounded\\">\\n          <LogIn class=\\"w-4 h-4\\" />\\n          <span>Login</span>\\n        </button>\\n        <button class=\\"flex items-center space-x-1 border border-amstram-white px-2 py-1 rounded\\">\\n          <span>FR</span>\\n          <ChevronDown class=\\"w-4 h-4\\" />\\n        </button>\\n      </div>\\n    </header>\\n    <div class=\\"w-full flex-grow\\" data-aos=\\"fade-up\\" data-aos-duration=\\"1500\\">\\n      <section class=\\"max-w-7xl mx-auto  mt-24 px-4 sm:px-8\\">\\n        <h2 class=\\"text-5xl font-bold mb-12 text-center md:text-left\\">Votre véhicule, notre route</h2>\\n        <form class=\\"grid grid-cols-1 md:grid-cols-4 gap-6 ml-10 mr-10\\">\\n          <div class=\\"relative\\">\\n            <MapPin class=\\"absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400\\" />\\n            <input \\n              bind:this={departInput}\\n              type=\\"text\\" \\n              placeholder=\\"Lieu de départ (France)\\" \\n              class=\\"w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg\\" \\n            />\\n          </div>\\n          <div class=\\"relative\\">\\n            <MapPin class=\\"absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400\\" />\\n            <input type=\\"text\\" placeholder=\\"Lieux de livraison\\" class=\\"w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg\\" />\\n          </div>\\n          <div class=\\"relative\\">\\n            <select class=\\"w-full pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg\\">\\n              <option>Type de Véhicule</option>\\n            </select>\\n            <ChevronDown class=\\"absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400\\" />\\n          </div>\\n          <button class=\\"bg-amstram-purple text-white py-3 px-6 rounded-lg text-lg font-semibold\\">Reserver</button>\\n        </form>\\n      </section>\\n\\n      <section class=\\"max-w-7xl mx-auto mr-20 mt-24 px-4 sm:px-8 flex flex-col md:flex-row items-center\\">\\n        <div class=\\"md:w-1/2 mb-12  md:mb-0\\">\\n          <p class=\\"text-5xl font-bold mb-6\\">Livraison sur mesure dans toute l'Europe</p>\\n          <p class=\\"text-gray-300 text-3xl \\">\\n            Que vous soyez un particulier ou une entreprise, AMSTRAM vous offre une solution de transport de véhicules adaptée à vos besoins.\\n          </p>\\n        </div>\\n        <div class=\\"hidden lg:block \\">\\n          <Eumap />\\n        </div>\\n      </section>\\n      <img \\n        src=\\"/truck.webp\\" \\n        alt=\\"Truck\\" \\n        class=\\"absolute left-0 bottom-0 w-1/8 md:w-1/12 truck-animation hidden md:block\\" \\n        data-aos=\\"fade-left\\" \\n        data-aos-duration=\\"2000\\"\\n        data-aos-delay=\\"1000\\"\\n        data-aos-offset=\\"0\\"\\n      />\\n    </div>\\n  </div>\\n\\n \\n\\n  <div class=\\"section w-full bg-gray-100 bg-hero-patern-b relative overflow-hidden transition-colors duration-1000\\">\\n    <img src=\\"/side2.webp\\" alt=\\"Décoration latérale\\" class=\\"absolute right-0 bottom-0 object-cover hidden lg:block opacity-50 parallax-bg\\" style=\\"z-index: 1;\\" />\\n    <div class=\\"min-h-screen flex flex-col justify-center py-12 relative\\" style=\\"z-index: 2;\\">\\n      <h2 class=\\"text-5xl font-bold mb-5 text-center text-amstram-black\\" data-aos=\\"fade-up\\" data-aos-duration=\\"1500\\">Nos offres</h2>\\n      <section class=\\"max-w-7xl mx-auto mt-12 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12\\">\\n        <Card.Root class=\\"relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300\\" data-aos=\\"fade-right\\" data-aos-duration=\\"1500\\">\\n          <Card.Header class=\\"pt-16\\">\\n            <Card.Title class=\\"text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4\\">1. Le Pilote Express</Card.Title>\\n          </Card.Header>\\n          <Card.Content>\\n            <img src=\\"driver.webp\\" alt=\\"Pilote Express\\" class=\\"w-full h-48 object-cover rounded-lg mb-6\\" />\\n            <p class=\\"text-gray-700 text-lg text-center\\">\\n              Un chauffeur professionnel prend le volant de votre véhicule pour une livraison en conduite directe. Idéal pour une livraison rapide et personnalisée.\\n            </p>\\n            <ul class=\\"text-gray-700 mt-4 list-disc pl-5\\">\\n              <li>Livraison porte-à-porte</li>\\n              <li>Chauffeurs expérimentés et certifiés</li>\\n            </ul>\\n          </Card.Content>\\n        </Card.Root>\\n\\n        <Card.Root class=\\"relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300\\" data-aos=\\"fade-left\\" data-aos-duration=\\"1500\\">\\n          <Card.Header class=\\"pt-16\\">\\n            <Card.Title class=\\"text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4\\">2. Le Cocon Roulant</Card.Title>\\n          </Card.Header>\\n          <Card.Content>\\n            <img src=\\"porte-voitures1.webp\\" alt=\\"Cocon Roulant\\" class=\\"w-full h-48 object-cover rounded-lg mb-6\\" />\\n            <p class=\\"text-gray-700 text-lg text-center\\">\\n              Votre véhicule voyage confortablement dans un camion spécialisé, préservant son kilométrage et son état. Parfait pour les véhicules de luxe ou de collection.\\n            </p>\\n            <ul class=\\"text-gray-700 mt-4 list-disc pl-5\\">\\n              <li>Protection maximale contre les intempéries</li>\\n              <li>Transport multi-véhicules possible</li>\\n            </ul>\\n          </Card.Content>\\n        </Card.Root>\\n      </section>\\n    </div>\\n  </div>\\n\\n  <div class=\\"section min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000\\">\\n    <img src=\\"/side1.webp\\" alt=\\"Décoration latérale\\" class=\\"absolute left-1 -bottom-0 h-3/4 w-50 object-cover hidden lg:block \\" style=\\"z-index: -1;\\" data-aos=\\"fade-up\\" data-aos-duration=\\"1500\\" data-aos-delay=\\"200\\" />\\n    <section class=\\"max-w-7xl mx-auto mt-24 px-4 sm:px-8 flex-grow relative\\">\\n      <img src=\\"/side0.webp\\" alt=\\"Décoration latérale\\" class=\\"absolute right-0 bottom-10 w-1/3  w-50 object-cover hidden lg:block parallax-bg\\" style=\\"z-index: -1;\\" />\\n\\n      <h2 class=\\"text-4xl font-bold mb-12 text-center text-amstram-white\\" data-aos=\\"fade-up\\" data-aos-duration=\\"1500\\">Pourquoi choisir AMSTRAM ?</h2>\\n      <div class=\\"grid grid-cols-1 md:grid-cols-2 gap-8 mb-16\\">\\n        <div class=\\"outline outline-1 outline-white p-6 rounded-xl\\" data-aos=\\"zoom-in\\" data-aos-duration=\\"1500\\" data-aos-delay=\\"100\\">\\n          <div class=\\"flex items-start mb-4\\">\\n            <svg class=\\"w-10 h-10 text-amstram-purple mr-4 flex-shrink-0\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n              <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5\\"></path>\\n            </svg>\\n            <h3 class=\\"text-2xl font-semibold text-amstram-white\\">Flexibilité maximale</h3>\\n          </div>\\n          <p class=\\"text-gray-300 text-lg\\">Du sur-mesure pour chaque trajet. Nous adaptons nos services à vos besoins spécifiques, que ce soit pour le type de véhicule, le timing ou les exigences particulières.</p>\\n        </div>\\n        <div class=\\"outline outline-1 outline-white p-6 rounded-xl\\" data-aos=\\"zoom-in\\" data-aos-duration=\\"1500\\" data-aos-delay=\\"200\\">\\n          <div class=\\"flex items-start mb-4\\">\\n            <svg class=\\"w-10 h-10 text-amstram-purple mr-4 flex-shrink-0\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n              <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\\"></path>\\n            </svg>\\n            <h3 class=\\"text-2xl font-semibold text-amstram-white\\">Sécurité garantie</h3>\\n          </div>\\n          <p class=\\"text-gray-300 text-lg\\">Chauffeurs expérimentés et véhicules adaptés. Nos professionnels sont formés pour manipuler tous types de véhicules, et notre flotte est équipée des dernières technologies de sécurité.</p>\\n        </div>\\n        <div class=\\"outline outline-1 outline-white p-6 rounded-xl\\" data-aos=\\"zoom-in\\" data-aos-duration=\\"1500\\" data-aos-delay=\\"300\\">\\n          <div class=\\"flex items-start mb-4\\">\\n            <svg class=\\"w-10 h-10 text-amstram-purple mr-4 flex-shrink-0\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n              <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\\"></path>\\n            </svg>\\n            <h3 class=\\"text-2xl font-semibold text-amstram-white\\">Rapport qualité-prix imbattable</h3>\\n          </div>\\n          <p class=\\"text-gray-300 text-lg\\">Des tarifs compétitifs pour un service premium. Nous offrons une transparence totale sur nos prix, sans frais cachés, tout en maintenant un niveau de service exceptionnel.</p>\\n        </div>\\n        <div class=\\"outline outline-1 outline-white p-6 rounded-xl\\" data-aos=\\"zoom-in\\" data-aos-duration=\\"1500\\" data-aos-delay=\\"400\\">\\n          <div class=\\"flex items-start mb-4\\">\\n            <svg class=\\"w-10 h-10 text-amstram-purple mr-4 flex-shrink-0\\" fill=\\"none\\" stroke=\\"currentColor\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\">\\n              <path stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\\"></path>\\n            </svg>\\n            <h3 class=\\"text-2xl font-semibold text-amstram-white\\">Sérénité totale</h3>\\n          </div>\\n          <p class=\\"text-gray-300 text-lg\\">Un paiement différé, vous ne payez que quand votre véhicule est arrivé à destination. Cette politique de paiement vous assure une tranquillité d'esprit tout au long du processus de livraison.</p>\\n        </div>\\n      </div>\\n    </section>\\n    <img \\n    src=\\"/truck.webp\\" \\n    alt=\\"Truck\\" \\n    class=\\"absolute right-0 bottom-0 w-1/8 md:w-1/12 truck-animation1 hidden md:block\\" \\n    data-aos=\\"fade-bottom\\" \\n    data-aos-duration=\\"2000\\"\\n    data-aos-delay=\\"1000\\"\\n    data-aos-offset=\\"0\\"\\n    />\\n  </div>\\n\\n  <!-- Indicateurs de position de défilement -->\\n  <div class=\\"fixed right-4 top-1/2 transform -translate-y-1/2 z-50\\">\\n    <div class=\\"flex flex-col space-y-2\\">\\n      <div class=\\"w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer\\" class:active={currentSection === 0} on:click={scrollToSection1}></div>\\n      <div class=\\"w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer\\" class:active={currentSection === 1} on:click={scrollToSection2}></div>\\n      <div class=\\"w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer\\" class:active={currentSection === 2} on:click={scrollToSection3}></div>\\n    </div>\\n  </div>\\n\\n  <footer class=\\"mt-16 bg-gray-800 py-8 w-full\\">\\n    <div class=\\"max-w-4xl mx-auto px-4 text-center\\">\\n      <p class=\\"text-gray-300\\">\\n        Faites confiance à AMSTRAM pour le transport de votre véhicule et vivez une expérience de livraison sans précédent !\\n      </p>\\n    </div>\\n  </footer>\\n</main>\\n<!-- Le reste du HTML reste inchangé -->\\n\\n<style>\\n  .parallax-bg {\\n    transition: transform 0.5s ease-out;\\n  }\\n\\n  .scroll-indicator {\\n    opacity: 0.5;\\n    transition: opacity 0.3s ease, transform 0.3s ease;\\n  }\\n\\n  .scroll-indicator.active {\\n    opacity: 1;\\n    transform: scale(1.5);\\n  }\\n\\n  .section {\\n    transition: background-color 1s ease;\\n  }\\n\\n  @keyframes truckMove {\\n    0% {\\n      transform: translateX(0);\\n      opacity: 0.3;\\n    }\\n    70% {\\n      transform: translateX(65vw);\\n      opacity: 1;\\n    }\\n    100% {\\n      transform: translateX(90vw);\\n      opacity: 0;\\n    }\\n  }\\n\\n  @keyframes truckMove1 {\\n    0% {\\n      transform: translateY(100vh);\\n      opacity:1;\\n    }\\n    20% {\\n      opacity: 1;\\n    }\\n    80% {\\n      transform: translateY(20vh);\\n      opacity: 1;\\n    }\\n    100% {\\n      transform: translateY(0);\\n      opacity: 1;\\n    }\\n  }\\n\\n\\n  .truck-animation {\\n    animation: truckMove 2s ease-in-out 1s forwards;\\n  }\\n  .truck-animation1 {\\n    animation: truckMove1 2s ease-in-out 1s forwards;\\n  }\\n</style>\\n<!-- Suppression de l'écouteur d'événement de la roue de la souris -->\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n"],"names":[],"mappings":"AA+QE,0BAAa,CACX,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,QAC7B,CAEA,+BAAkB,CAChB,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,CAAC,IAChD,CAEA,iBAAiB,qBAAQ,CACvB,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,GAAG,CACtB,CAEA,sBAAS,CACP,UAAU,CAAE,gBAAgB,CAAC,EAAE,CAAC,IAClC,CAEA,WAAW,uBAAU,CACnB,EAAG,CACD,SAAS,CAAE,WAAW,CAAC,CAAC,CACxB,OAAO,CAAE,GACX,CACA,GAAI,CACF,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,CACX,CACA,IAAK,CACH,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,CACX,CACF,CAEA,WAAW,wBAAW,CACpB,EAAG,CACD,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,QAAQ,CACV,CACA,GAAI,CACF,OAAO,CAAE,CACX,CACA,GAAI,CACF,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,CACX,CACA,IAAK,CACH,SAAS,CAAE,WAAW,CAAC,CAAC,CACxB,OAAO,CAAE,CACX,CACF,CAGA,8BAAiB,CACf,SAAS,CAAE,uBAAS,CAAC,EAAE,CAAC,WAAW,CAAC,EAAE,CAAC,QACzC,CACA,+BAAkB,CAChB,SAAS,CAAE,wBAAU,CAAC,EAAE,CAAC,WAAW,CAAC,EAAE,CAAC,QAC1C"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let departInput;
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-gopbcd_START --><link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css"><!-- HEAD_svelte-gopbcd_END -->`, ""} <main class="w-full text-amstram-white font-sans"><div class="section min-h-screen flex flex-col relative transition-colors duration-1000 svelte-ghzp5k"><img src="/side.webp" alt="Décoration latérale" class="absolute left-0 top-20 h-full object-cover hidden md:block parallax-bg svelte-ghzp5k" style="z-index: -1;"> <header class="flex justify-between items-center p-4 max-w-7xl mx-auto"><div class="absolute left-0 top-0 mt-5 ml-10">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div> <div class="absolute right-1 top-3 md:top-9 mt-10 flex items-center space-x-4 md:mr-20 mr-1 md:mt-5 mt-14"><button class="flex items-center space-x-1 bg-amstram-purple px-3 py-1 rounded">${validate_component(Log_in, "LogIn").$$render($$result, { class: "w-4 h-4" }, {}, {})} <span data-svelte-h="svelte-sdljcx">Login</span></button> <button class="flex items-center space-x-1 border border-amstram-white px-2 py-1 rounded"><span data-svelte-h="svelte-1k2hxxu">FR</span> ${validate_component(Chevron_down, "ChevronDown").$$render($$result, { class: "w-4 h-4" }, {}, {})}</button></div></header> <div class="w-full flex-grow" data-aos="fade-up" data-aos-duration="1500"><section class="max-w-7xl mx-auto mt-24 px-4 sm:px-8"><h2 class="text-5xl font-bold mb-12 text-center md:text-left" data-svelte-h="svelte-5v543r">Votre véhicule, notre route</h2> <form class="grid grid-cols-1 md:grid-cols-4 gap-6 ml-10 mr-10"><div class="relative">${validate_component(Map_pin, "MapPin").$$render(
    $$result,
    {
      class: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
    },
    {},
    {}
  )} <input type="text" placeholder="Lieu de départ (France)" class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg"${add_attribute("this", departInput, 0)}></div> <div class="relative">${validate_component(Map_pin, "MapPin").$$render(
    $$result,
    {
      class: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
    },
    {},
    {}
  )} <input type="text" placeholder="Lieux de livraison" class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-amstram-black text-lg"></div> <div class="relative"><select class="w-full pl-4 pr-12 py-3 rounded-lg bg-white text-amstram-black appearance-none text-lg"><option value="Type de Véhicule" data-svelte-h="svelte-1dj8uz0">Type de Véhicule</option></select> ${validate_component(Chevron_down, "ChevronDown").$$render(
    $$result,
    {
      class: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
    },
    {},
    {}
  )}</div> <button class="bg-amstram-purple text-white py-3 px-6 rounded-lg text-lg font-semibold" data-svelte-h="svelte-s8jxfh">Reserver</button></form></section> <section class="max-w-7xl mx-auto mr-20 mt-24 px-4 sm:px-8 flex flex-col md:flex-row items-center"><div class="md:w-1/2 mb-12 md:mb-0" data-svelte-h="svelte-8gn1lv"><p class="text-5xl font-bold mb-6">Livraison sur mesure dans toute l&#39;Europe</p> <p class="text-gray-300 text-3xl ">Que vous soyez un particulier ou une entreprise, AMSTRAM vous offre une solution de transport de véhicules adaptée à vos besoins.</p></div> <div class="hidden lg:block ">${validate_component(Eumap, "Eumap").$$render($$result, {}, {}, {})}</div></section> <img src="/truck.webp" alt="Truck" class="absolute left-0 bottom-0 w-1/8 md:w-1/12 truck-animation hidden md:block svelte-ghzp5k" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="1000" data-aos-offset="0"></div></div> <div class="section w-full bg-gray-100 bg-hero-patern-b relative overflow-hidden transition-colors duration-1000 svelte-ghzp5k"><img src="/side2.webp" alt="Décoration latérale" class="absolute right-0 bottom-0 object-cover hidden lg:block opacity-50 parallax-bg svelte-ghzp5k" style="z-index: 1;"> <div class="min-h-screen flex flex-col justify-center py-12 relative" style="z-index: 2;"><h2 class="text-5xl font-bold mb-5 text-center text-amstram-black" data-aos="fade-up" data-aos-duration="1500" data-svelte-h="svelte-13v23m8">Nos offres</h2> <section class="max-w-7xl mx-auto mt-12 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300",
      "data-aos": "fade-right",
      "data-aos-duration": "1500"
    },
    {},
    {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "pt-16" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render(
              $$result,
              {
                class: "text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4"
              },
              {},
              {
                default: () => {
                  return `1. Le Pilote Express`;
                }
              }
            )}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<img src="driver.webp" alt="Pilote Express" class="w-full h-48 object-cover rounded-lg mb-6"> <p class="text-gray-700 text-lg text-center" data-svelte-h="svelte-1h8521e">Un chauffeur professionnel prend le volant de votre véhicule pour une livraison en conduite directe. Idéal pour une livraison rapide et personnalisée.</p> <ul class="text-gray-700 mt-4 list-disc pl-5" data-svelte-h="svelte-9gx0f5"><li>Livraison porte-à-porte</li> <li>Chauffeurs expérimentés et certifiés</li></ul>`;
          }
        })}`;
      }
    }
  )} ${validate_component(Card, "Card.Root").$$render(
    $$result,
    {
      class: "relative bg-white bg-opacity-40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300",
      "data-aos": "fade-left",
      "data-aos-duration": "1500"
    },
    {},
    {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "pt-16" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render(
              $$result,
              {
                class: "text-3xl font-bold mb-4 absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 text-amstram-black text-center w-full px-4 mt-4"
              },
              {},
              {
                default: () => {
                  return `2. Le Cocon Roulant`;
                }
              }
            )}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<img src="porte-voitures1.webp" alt="Cocon Roulant" class="w-full h-48 object-cover rounded-lg mb-6"> <p class="text-gray-700 text-lg text-center" data-svelte-h="svelte-1qt51n9">Votre véhicule voyage confortablement dans un camion spécialisé, préservant son kilométrage et son état. Parfait pour les véhicules de luxe ou de collection.</p> <ul class="text-gray-700 mt-4 list-disc pl-5" data-svelte-h="svelte-9vnu95"><li>Protection maximale contre les intempéries</li> <li>Transport multi-véhicules possible</li></ul>`;
          }
        })}`;
      }
    }
  )}</section></div></div> <div class="section min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000 svelte-ghzp5k" data-svelte-h="svelte-1i0nl2q"><img src="/side1.webp" alt="Décoration latérale" class="absolute left-1 -bottom-0 h-3/4 w-50 object-cover hidden lg:block " style="z-index: -1;" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200"> <section class="max-w-7xl mx-auto mt-24 px-4 sm:px-8 flex-grow relative"><img src="/side0.webp" alt="Décoration latérale" class="absolute right-0 bottom-10 w-1/3 w-50 object-cover hidden lg:block parallax-bg svelte-ghzp5k" style="z-index: -1;"> <h2 class="text-4xl font-bold mb-12 text-center text-amstram-white" data-aos="fade-up" data-aos-duration="1500">Pourquoi choisir AMSTRAM ?</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"><div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="100"><div class="flex items-start mb-4"><svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg> <h3 class="text-2xl font-semibold text-amstram-white">Flexibilité maximale</h3></div> <p class="text-gray-300 text-lg">Du sur-mesure pour chaque trajet. Nous adaptons nos services à vos besoins spécifiques, que ce soit pour le type de véhicule, le timing ou les exigences particulières.</p></div> <div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="200"><div class="flex items-start mb-4"><svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> <h3 class="text-2xl font-semibold text-amstram-white">Sécurité garantie</h3></div> <p class="text-gray-300 text-lg">Chauffeurs expérimentés et véhicules adaptés. Nos professionnels sont formés pour manipuler tous types de véhicules, et notre flotte est équipée des dernières technologies de sécurité.</p></div> <div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="300"><div class="flex items-start mb-4"><svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <h3 class="text-2xl font-semibold text-amstram-white">Rapport qualité-prix imbattable</h3></div> <p class="text-gray-300 text-lg">Des tarifs compétitifs pour un service premium. Nous offrons une transparence totale sur nos prix, sans frais cachés, tout en maintenant un niveau de service exceptionnel.</p></div> <div class="outline outline-1 outline-white p-6 rounded-xl" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="400"><div class="flex items-start mb-4"><svg class="w-10 h-10 text-amstram-purple mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <h3 class="text-2xl font-semibold text-amstram-white">Sérénité totale</h3></div> <p class="text-gray-300 text-lg">Un paiement différé, vous ne payez que quand votre véhicule est arrivé à destination. Cette politique de paiement vous assure une tranquillité d&#39;esprit tout au long du processus de livraison.</p></div></div></section> <img src="/truck.webp" alt="Truck" class="absolute right-0 bottom-0 w-1/8 md:w-1/12 truck-animation1 hidden md:block svelte-ghzp5k" data-aos="fade-bottom" data-aos-duration="2000" data-aos-delay="1000" data-aos-offset="0"></div>  <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"><div class="flex flex-col space-y-2"><div class="${[
    "w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer svelte-ghzp5k",
    "active"
  ].join(" ").trim()}"></div> <div class="${[
    "w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer svelte-ghzp5k",
    ""
  ].join(" ").trim()}"></div> <div class="${[
    "w-3 h-3 rounded-full bg-amstram-purple scroll-indicator cursor-pointer svelte-ghzp5k",
    ""
  ].join(" ").trim()}"></div></div></div> <footer class="mt-16 bg-gray-800 py-8 w-full" data-svelte-h="svelte-a67b1i"><div class="max-w-4xl mx-auto px-4 text-center"><p class="text-gray-300">Faites confiance à AMSTRAM pour le transport de votre véhicule et vivez une expérience de livraison sans précédent !</p></div></footer></main>   `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Dx4l8ZY-.js.map
