$(document).ready(function() {
    $("#table").css("display", "block");
    $("#bracket").css("display", "none");
    $("#defaultOpen").click()
    initSimulation()
})

function openGroup(evt, group) {
    let shouldShowGroups = true
    switch(group) {
        case 'A': handleGroup(a, true); break;
        case 'B': handleGroup(b, true); break;
        case 'C': handleGroup(c, true); break;
        case 'D': handleGroup(d, true); break;
        case 'E': handleGroup(e, true); break;
        case 'F': handleGroup(f, true); break;
        case 'G': handleGroup(g, true); break;
        case 'H': handleGroup(h, true); break;
        case 'bracket': 
        shouldShowGroups = false
        renderBrackets()
        break;
    }
    showGroups(shouldShowGroups)

    $(".tablinks").toArray().forEach(a => $(a).removeClass("active"))
    $(evt.target).addClass("active");
  }

function showGroups(bool) {
    let table = $("#table")
    if(bool && table.css("display") == "block") {
        return // groups already displayed
    }
    resetSimulationButton()
    table.css("display", bool ? "block" : "none");
    $("#bracket").css("display", !bool ? "block" : "none");
}