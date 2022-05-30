$(document).ready(function() {
    $("#table").css("display", "block");
    $("#bracket").css("display", "none");
    $("#defaultOpen").click()
})

function openGroup(evt, group) {
    switch(group) {
        case 'A': handleGroup(a); break;
        case 'B': handleGroup(b); break;
        case 'C': handleGroup(c); break;
        case 'D': handleGroup(d); break;
        case 'E': handleGroup(e); break;
        case 'F': handleGroup(f); break;
        case 'G': handleGroup(g); break;
        case 'H': handleGroup(h); break;
        case 'bracket': 
        init_brackets()
        showGroups(false)
        break;
    }

    let tablinks = $(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
      $(tablinks[i]).removeClass("active");
    }
    $(evt.target).addClass("active");
  }

function showGroups(bool) {
    $("#table").css("display", bool ? "block" : "none");
    $("#bracket").css("display", !bool ? "block" : "none");
}