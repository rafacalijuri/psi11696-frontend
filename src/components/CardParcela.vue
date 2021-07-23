<template>

    <v-card class="my-8">
        <v-card-title class="head-card" style="color: #7c91c1">
            PARCELAS
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
                <th class="text-center">
                Amortização
                </th>
                <th class="text-center">
                Juros
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr  v-for="(parcela, index) in dados" :key="parcela.NU_PARCELA">
                <td class="text-center">{{ parcela.NU_PARCELA }}</td>
                <td class="text-center">{{ parcela.DT_PARCELA | formataData }}</td>
                <td class="text-center">
                <v-text-field
                    style="width:100px"
                    @input="value=>parcela.VR_PARCELA=value"
                    @change="alteraBotaoSalvar(index)"
                    :value="parcela.VR_PARCELA.replace('.',',')" 
                    v-mask="mask"
                >  
                </v-text-field>
                </td>
                <td class="text-center">{{ parcela.VR_AMORTIZACAO | formataCurrency  }}</td>
                <td class="text-center">{{ parcela.VR_JUROS | formataCurrency  }} %</td>
                <td class="text-center">
                <v-icon ref="botaoSalvar" @click="salvaParcela(parcela.NU_PARCELA, parcela.VR_PARCELA, index)" >mdi-content-save</v-icon>
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

    name: 'CardParcela',
    props: ['dados','mask','produtoSelecionado','contratoSelecionado'],

    methods:{

        alteraBotaoSalvar(index){
            this.$refs.botaoSalvar[index].$el.style.color = '#ffbe46';
        },

        salvaParcela(parcelaId, valorParcela, index){

            if(this.$refs.botaoSalvar[index].$el.style.color == 'rgb(255, 190, 70)'){

                valorParcela = valorParcela.replaceAll('.','').replaceAll(',','.');

                this.axios.put(
                    pathApi + `/contratos/${this.produtoSelecionado}/${this.contratoSelecionado}/parcelas/${parcelaId}`,
                    {
                    'VR_PARCELA' : valorParcela
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

    .botao-amarelo{
        color:#ff9494;
    }

</style>
