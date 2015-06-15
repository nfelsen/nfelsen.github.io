$(document).ready(function () {
    var output = $("#output");
    var rwcu = $("#rwcu");
    var wcu = $("#wcu");
    var rcu = $("#rcu");
    var size = $("#size");
    var storage = $("#storage");
    var calculateBasedOnSize = function () {
        return Math.max(1,Math.round(parseFloat(size.val()) / 25));
    };
    var calculateBasedOnThroughput = function () {
        return Math.max(1,Math.round(parseFloat(rcu.val()) / 3000 + parseFloat(wcu.val()) / 1000));
    };
    var calculateShards = function () {
        s = calculateBasedOnSize();
        t = calculateBasedOnThroughput();
        total = Math.max(s, t);
        return [s, t, total];
    };
    var updateDivs = function () {
        var r = calculateShards();
        var txtSize = "Number of partitions required, based solely on a table's size : " + r[0];
        if ( !isNaN(r[0])) {
            storage.text(txtSize);
        }
        var txtThroughput = "Number of partitions required, based solely on a table's provisioned read and write throughput settings : " + r[1];
        if ( !isNaN(r[1])) {
            rwcu.text(txtThroughput);
        }
        var txtTotal = "Total number of partitions allocated by DynamoDB: " + r[2];
        if ( !isNaN(r[2])) {
            output.text(txtTotal);
        }   
    };

    $("#size,#items,#wcu,#rcu").keyup(function () {
        var str = $(this).val();
        updateDivs();
    }).keyup();
});