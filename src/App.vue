<template>
  <v-app data-app>

    <v-card class="mx-auto my-3" width="980px">

      <v-app-bar dark color="#336699" class="pt-2">
        <v-container fluid >
          <v-layout row>

            <v-flex sm2 class="text-right pr-3 mt-2" >
              <v-toolbar-title class="text-h5 mt-1">PRODUTO</v-toolbar-title>
            </v-flex>

            <v-flex sm4 class="mt-2">
              <v-select solo dense background-color="#5a84ad" label="Selecione um produto" @change="this.carregaContratos"  v-model="produtoSelecionado" :items="selectProdutos" style="width:95%"></v-select>
            </v-flex>

            <v-flex sm2 class="text-right pr-3 mt-2" >
              <v-toolbar-title class="text-h5 mt-1">CONTRATO</v-toolbar-title>
            </v-flex>

            <v-flex sm4 class="mt-2"  >
              <v-select solo dense background-color="#5a84ad" label="Selecione um contrato" @change="this.carregaParcelaSaldo"  v-model="contratoSelecionado" :items="selectContratos" :disabled="desabilitaSelectContrato"></v-select>
            </v-flex>

          </v-layout>
        </v-container>
      </v-app-bar>

      <v-container fluid >
          <v-row>

            <v-col cols="7">  
              <card-parcela :dados="parcelas" :mask="mask" :produtoSelecionado="produtoSelecionado" :contratoSelecionado="contratoSelecionado"></card-parcela>
            </v-col>

            <v-col cols="5">
              <card-saldo :dados="saldos" :mask="mask" :produtoSelecionado="produtoSelecionado" :contratoSelecionado="contratoSelecionado"></card-saldo>
            </v-col>

          </v-row>
      </v-container>

    </v-card>

  </v-app>
</template>

<script>
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {pathApi} from '@/assets/js/variaveis.js';

import CardParcela from './components/CardParcela.vue';
import CardSaldo from './components/CardSaldo.vue';

const currencyMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol : '.',
    decimalSymbol : ',',
    allowDecimal: true,
  });

export default {
  name: 'App',

  components:{
    'card-parcela': CardParcela,
    'card-saldo': CardSaldo,
  },

  data: () => ({
    selectProdutos: [],
    selectContratos: [],
    produtoSelecionado: null,
    contratoSelecionado: null,
    parcelas: {},
    saldos: {},
    mask: currencyMask,
    desabilitaSelectContrato: true
  }),

  created(){
    let produtosPromisse = this.axios.get(pathApi + "/contratos/produtos");
    produtosPromisse
      .then(produtos => {
          for (var i = 0; i < produtos.data.length; i++) {
            this.selectProdutos.push(produtos.data[i].NU_PRODUTO);
          }
      });
  },

  methods:{

    carregaContratos(){

      this.contratoSelecionado = null;

      let contratosPromisse = this.axios.get(pathApi + `/contratos/produtos/${this.produtoSelecionado}`);
      contratosPromisse
        .then(contratos => {
            this.selectContratos = [];
            for (var i = 0; i < contratos.data.length; i++) {
              this.selectContratos.push(contratos.data[i].NU_CONTRATO);
            }
            this.desabilitaSelectContrato = false;
        });

    },

    carregaParcelaSaldo(){

      this.parcelas = {};
      this.saldos = {};

      let parcelasPromisse = this.axios.get(pathApi + `/contratos/${this.produtoSelecionado}/${this.contratoSelecionado}/parcelas`);
      parcelasPromisse
        .then(parcelas => this.parcelas = parcelas.data);

      let saldosPromisse = this.axios.get(pathApi + `/contratos/${this.produtoSelecionado}/${this.contratoSelecionado}/saldos`);
      saldosPromisse
        .then(saldos => this.saldos = saldos.data);

    },

  }
};
</script>

<style>

  .head-card{
    background: #f1f1f1;
    border-bottom: 1px solid#b5b5b5;
  }

</style>

