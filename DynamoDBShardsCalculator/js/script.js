$(document).ready(function () {
    var output = $("#output");
    var rwcu = $("#rwcu");
    var wcu = $("#wcu");
    var rcu = $("#rcu");
    var size = $("#size");
    var storage = $("#storage");
    var pricing = $("#pricing");
    var calculateBasedOnSize = function () {
        return Math.max(1,Math.ceil(parseFloat(size.val()) / 10));
    };
    var calculateBasedOnThroughput = function () {
        return Math.max(1,Math.ceil(parseFloat(rcu.val()) / 3000 + parseFloat(wcu.val()) / 1000));
    };
    var calculateCost = function() {
        var ch = Math.max(0, (parseFloat(size.val()) - 25) / 25) * .25 + (Math.ceil(parseFloat(wcu.val()) / 10) + Math.ceil(parseFloat(rcu.val()) / 50)) * 0.0065 
        var cm = Math.round(ch * 24 * 30, 2)
        return [ch, cm]
    };
    var calculateShards = function () {
        s = calculateBasedOnSize();
        t = calculateBasedOnThroughput();
        total = Math.max(s, t);
        cost = calculateCost();
        return [s, t, total, cost];
    };
    var updateDivs = function () {
        var r = calculateShards();
        var txtSize = "Number of shards required, based solely on a table's size : " + r[0];
        if ( !isNaN(r[0])) {
            storage.text(txtSize);
        }
        var txtThroughput = "Number of shards required, based solely on a table's provisioned read and write throughput settings : " + r[1];
        if ( !isNaN(r[1])) {
            rwcu.text(txtThroughput);
        }
        var txtTotal = "Total number of shards allocated (Max(shared for throughput, shards for capacity)): " + r[2];
        if ( !isNaN(r[2])) {
            output.text(txtTotal);
        }
        var txtPricing = "Pricing in us-east-1 (might be subject to change): $" + r[3][0] + " per hour ($" + r[3][1] + " monthly)";
        if ( !isNaN(r[3][0])) {
            pricing.text(txtPricing);
        }
    };

    $("#size,#items,#wcu,#rcu").keyup(function () {
        var str = $(this).val();
        updateDivs();
    }).keyup();
    $('#popoverDataSize,#popoverDataWCU,#popoverDataRCU').popover();
});
