 const dataInput = document.getElementById("data_hoje");
            const nomeInput = document.getElementById("nome");
            const idadeInput = document.getElementById("idade");
            const sexoInput = document.getElementById("sexo");
            const setorInput = document.getElementById("setor");
            const salarioInput = document.getElementById("salario");

            const hoje = new Date();

            const data = `${hoje.getDate()}/${String(hoje.getMonth()+1).padStart(2, '0')}/${hoje.getFullYear()}`;


            let x = 0;

            let dadosPlanilha = [];

        document.getElementById('planilha').addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
                alert('Por favor, envie uma planilha!');
                e.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const primeiraAba = workbook.SheetNames[0];
                const planilha = workbook.Sheets[primeiraAba];
                dadosPlanilha = XLSX.utils.sheet_to_json(planilha);

                console.log("Dados carregados:", dadosPlanilha);
                alert("Planilha carregada com sucesso!");
            };
            reader.readAsArrayBuffer(file);
        });


        function load()
        {
            dataInput.value = data;
        }
           
            function passarDados()
            {
                if(dadosPlanilha.length > 0)
                {   
                    for( x of dadosPlanilha)
                    {
                        if(nomeInput.value.toLowerCase() == x.Nome.toLowerCase())
                        {

                            let salario = parseFloat(x.Salario).toFixed(2);

                            idadeInput.value = x.Idade;
                            sexoInput.value = x.Sexo;
                            setorInput.value = x.Setor;
                            salarioInput.value = `R$${salario}`;
                        }
                    }
                }
                else{
                    alert("Carregue uma planilha primeiro!");

                    nomeInput.value = "";
                    idadeInput.value = "";
                    sexoInput.value = "";
                    setorInput.value = "";
                    salarioInput.value = "";
                }
            }
