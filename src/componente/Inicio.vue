<template>
	<section id="app" class="container">
		<h1>Cadastro Animais</h1>
		<b-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :variant="mensagem.tipo">{{mensagem.texto}}</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" size="lg" v-model="animal.nome" placeholder="Informe o nome">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Espécie:">
				<b-form-input type="text" size="lg" v-model="animal.especie" placeholder="Informe a espécie">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Cor:">
				<b-form-input type="text" size="lg" v-model="animal.cor" placeholder="Informe a cor">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Idade:">
				<b-form-input type="number" size="lg" v-model="animal.idade" placeholder="Informe a idade">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Porte:">
				<b-form-input type="text" size="lg" v-model="animal.porte" placeholder="Informe o porte">
				</b-form-input>
			</b-form-group>
			<b-form-group label="Nome Do Responsavel:">
				<b-form-input type="text" size="lg" v-model="animal.nomeResponsavel" placeholder="Informe o nome do responsavel">
				</b-form-input>
			</b-form-group>
			<b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>
			<b-button @click="obterAnimais" class="ml-2" size="lg" variant="success">Obter Cadastros</b-button>
		</b-card>
		<hr>
		<b-list-group-item v-for="(animal,id) in animais" :key='id'>
			<strong>Nome:</strong>{{ animal.nome }}<br>
			<strong>Especie:</strong>{{ animal.especie }}<br>
			<strong>Cor:</strong>{{ animal.cor }}<br>
			<strong>Idade:</strong>{{ animal.idade }}<br>
			<strong>Porte:</strong>{{ animal.porte }}<br>
			<strong>Nome Do Responsavel:</strong>{{ animal.nomeResponsavel }}<br>
			<b-button size="lg" variant="warning" @click="carregar(id)">Carregar</b-button>
			<b-button size="lg" variant="danger" class="ml-2" @click="excluir(id)">Excluir</b-button>
		</b-list-group-item>
	</section>
</template>

<script> 
export default {
	data(){
		return{
			animais:[],
			mensagens:[],
			id:null,
			animal:{
				nome: '',
				especie: '',
				cor: '',
				idade:'',
				porte:'',
				nomeResponsavel:''
			}
		}
		
	},
	methods:{
		limpar(){
			this.animal.nome = '',
			this.animal.especie = '',
			this.animal.cor = '',
			this.animal.idade = '',
			this.animal.porte = '',
			this.animal.nomeResponsavel= '',
			this.id = null,
			this.mensagens = []
		},
		salvar(){
			const metodo = this.id ? 'patch' : 'post'
			const final = this.id ? `/${this.id}.json` : '.json'
			this.$http[metodo](`/animal${final}`, this.animal)
			.then(() => {
				this.limpar()
				this.mensagens.push({
					texto:"Operação realizada com sucesso",
					tipo:'success'
				})
			})
		},
		obterAnimais(){
			this.$http.get('animal.json').then(res =>{
				this.animais = res.data
			})
		},
		carregar(id){
			this.id = id
			this.animal = {...this.animais[id]}
		},
		excluir(id){
			this.$http.delete(`/animal/${id}.json`)
			.then(()=> this.limpar())
			this.obterAnimais()
			.cath(() => {
				this.mensagens.push({
					texto:"Problema para excluir!",
					tipo:'danger' 
				})
			})
			
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
