<script>
    import { sendConfirmationEmail } from '$lib/appwrite';
    import { onMount } from 'svelte';

    let data = "";
    onMount(async () => {
        data =  JSON.stringify(await sendConfirmationEmail("674d83cf000c3a2c2341", "test", "test"));
        console.log(data);
    });
</script>

<div>
    <p>test</p>
    <p>{data}</p>
</div>