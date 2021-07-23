<template>

    <v-card class="my-8">
        <v-card-title class="head-card" style="color: #ffb100">
            SALDOS
        </v-card-title>

        <v-simple-table v-if="dados.length > 0">
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-center">
                Número
                </th>
                <th class="text-center">
                Data
                </th>
                <th class="text-center">
                Valor
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(saldo, index) in dados" :key="saldo.NU_SALDO">

                <td class="text-center">{{ saldo.NU_SALDO }}</td>
                <td class="text-center">{{ saldo.DT_SALDO | formataData }}</td>
                <td class="text-center">
                <v-text-field
                    style="width:100px"
                    @input="value=>saldo.VR_SALDO=value"
                    @change="alteraBotaoSalvar(index)"
                    :value="saldo.VR_SALDO.replace('.',',')" 
                    v-mask="mask"
                >  
                </v-text-field>
                </td>
                <td class="text-center">
                <v-icon ref="botaoSalvar" @click="salvaSaldo(saldo.NU_SALDO, saldo.VR_SALDO, index)">mdi-content-save</v-icon>
                </td>

            </tr>

            </tbody>
        </template>
        </v-simple-table>

    </v-card> 
    
</template>

<script>
import {pathApi} from '@/assets/js/variaveis.js';

export default {

    name: 'CardSaldo',
    props: ['dados','mask','produtoSelecionado','contratoSelecionado'],

    methods:{

        alteraBotaoSalvar(index){
            this.$refs.botaoSalvar[index].$el.style.color = '#ffbe46';
        },

        salvaSaldo(saldoId, valorSaldo, index){

            if(this.$refs.botaoSalvar[index].$el.style.color == 'rgb(255, 190, 70)'){

                valorSaldo = valorSaldo.replaceAll('.','').replaceAll(',','.');

                this.axios.put(
                    pathApi + `/contratos/${this.produtoSelecionado}/${this.contratoSelecionado}/saldos/${saldoId}`,
                    {
                    'VR_SALDO' : valorSaldo
                    }
                )
                .then(this.$refs.botaoSalvar[index].$el.style.color = '#89e48c');

            }
        },

    }
    
};
</script>

<style scoped>
    .v-input >>> input {
      text-align: center
    }
</style>
