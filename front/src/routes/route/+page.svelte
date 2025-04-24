<script lang="ts">
    import { goto } from "$app/navigation";
    import { getRoutes, getUser, updateRoute } from "$lib/appwrite";
    import { onMount } from "svelte";
   // import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import { Search, ArrowUpDown, Trash2 } from "lucide-svelte";
    import { intStatus } from "$lib/contenu";
    import Header from "$lib/components/Header.svelte";
    import AOS from "aos";

    let routes: any[] = [];
    let user: any;
    let searchTerm = "";
    let sortColumn = "$createdAt";
    let sortDirection = -1;
    let openDropdown: string | null = null;

    const columns_data: { [key: string]: string } = {
        "Depart": "depart",
        "Arrival": "arrival",
        "Disponibility": "disponibility",
        "Vehicle Mark": "vMark",
        "Price": "price",
        "Status": "status",
        "Created At": "$createdAt"
    };
     
    onMount(async () => {
        routes = (await getRoutes()).documents;
        sortTable("Created At"); 
        sortTable("Created At"); 
        AOS.init({
            duration: 1000,
            once: true,
            offset: 0
        });
    });

    function sortTable(column: string) {
        const columnKey = columns_data[column];
        if (!routes.every(route => columnKey in route)) {
            console.error(`La colonne "${columnKey}" n'existe pas dans les données.`);
            return;
        }

        if (sortColumn === columnKey) {
            sortDirection *= -1;
        } else {
            sortColumn = columnKey;
            sortDirection = -1;  
        }

        routes = routes.sort((a, b) => {
            const valA = a[columnKey]?.toString().toLowerCase() ?? '';
            const valB = b[columnKey]?.toString().toLowerCase() ?? '';
            return valA.localeCompare(valB) * sortDirection;
        });
    }

    function filterRoutes(route: any) {
        return Object.values(route).some(
            (value) => 
                value && 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    async function changeStatus(route: any, status: number) {
        console.log(`Changing status for route ${route.$id} to ${status}`);
        route.status = status;
        try {
            const res = await updateRoute(route);
            routes = [...routes];
            openDropdown = null;
        } catch (error) {
            console.log(error)
            alert("PROBLEME LORS DU CHANGEMENT DE STATUS")
        }
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    $: filteredRoutes = routes.filter(filterRoutes);
</script>

<div class="my-10">

    <Header />
</div>

<div class="min-h-screen p-6">
    <div class="max-w-[1400px] mx-auto space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold">Tableau de bord</h1>
            <div class="relative w-96">
               <!--
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                type="text" 
                placeholder="Search routes..." 
                bind:value={searchTerm} 
                class="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 w-full"
                />
                -->
            </div>
        </div>

        <div class="rounded-lg border border-gray-700 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div class="overflow-x-auto">
                <Table>
                    <TableHeader class="bg-gray-800/50">
                        <TableRow>
                            {#each Object.keys(columns_data) as header}
                                <TableHead class="text-gray-300 hover:text-white">
                                    <button 
                                        class="flex items-center space-x-1 w-full" 
                                        on:click={() => sortTable(header)}
                                    >
                                        <span>{header}</span>
                                        <ArrowUpDown class="w-4 h-4" />
                                    </button>
                                </TableHead>
                            {/each}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {#each filteredRoutes as route}
                            <TableRow class="hover:bg-gray-800/50">
                                <TableCell class="min-w-[250px] p-4">
                                    <div class="bg-gray-800/30 p-3 rounded-lg">
                                        {route.depart}
                                    </div>
                                </TableCell>
                                <TableCell class="min-w-[250px] p-4">
                                    <div class="bg-gray-800/30 p-3 rounded-lg">
                                        {route.arrival}
                                    </div>
                                </TableCell>
                                <TableCell>{formatDate(route.disponibility)}</TableCell>
                                <TableCell>{route.vMark}</TableCell>
                                <TableCell>{route.price}</TableCell>
                                <TableCell>
                                     {intStatus[route.status]}
                                </TableCell>
                                <TableCell>{formatDate(route.$createdAt)}</TableCell>
                                <TableCell>
                                    <Button 
                                        class="bg-blue-500 text-white"
                                        on:click={() => {
                                              goto(`/route/${route.$id}`);
                                        }}
                                    >
                                        Voir Détails
                                    </Button>
                                </TableCell>
                            </TableRow>
                        {/each}
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
</div>