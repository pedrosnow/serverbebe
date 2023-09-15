class Api {
   static async get(endpoint) {

        const url = `${window.location.origin}/${endpoint}`         

        try {
            const response = await fetch(url,{
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr("content"),
                }
            });
            if (!response.ok) {
                throw new Error(`Erro na requisição GET para ${endpoint}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}