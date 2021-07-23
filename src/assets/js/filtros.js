import Vue from "vue";
import Moment  from "moment";

Vue.filter("formataData", function (value) {
    return Moment(String(value)).format('DD/MM/YYYY')
});

Vue.filter("formataCurrency", function (value) {
    if (isNaN(parseFloat(value)))
        return 0;

    return parseFloat(value).toLocaleString(undefined, {maximumFractionDigits: 2});
});
