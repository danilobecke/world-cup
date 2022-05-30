function resetImages() {
    $(".image-box").toArray().forEach(function(element) {
        $(element).removeAttr("src");
    });
}

function handleGroup(group) {
    showGroups(true)
    resetImages()
    $("tr").each(function(position, tr) {
        if(position == 0) {
            return // skip header
        }
        let team = group["teams"].find(function(element) {
            return element["position"] == position
        })
        $(tr).children().each(function(index, td) {
            let dataElement = $(td).children().toArray().find(function(element) {
                return $(element).hasClass("data");
            })
            switch(index) {
                case 0, 1: return
                case 2:
                    let imageElement = $(td).children().toArray().find(function(element) {
                        return $(element).hasClass("image-box");
                    })
                    let acronym = team["acronym"]
                    if(acronym != "unknown") {
                        $(imageElement).attr("src", "https://countryflagsapi.com/png/" + team["acronym"]);
                    }
                    $(dataElement).html(team["name"]);
                    break;
                case 3: $(dataElement).html(team["points"]); break;
                case 4: $(dataElement).html(team["win"] + team["draw"] + team["loss"]); break;
                case 5: $(dataElement).html(team["win"]); break;
                case 6: $(dataElement).html(team["draw"]); break;
                case 7: $(dataElement).html(team["loss"]); break;
                case 8: $(dataElement).html(team["goals-scored"] - team["goals-conceded"]); break;
                case 9: $(dataElement).html(team["goals-scored"]); break;
                case 10: $(dataElement).html(team["goals-conceded"]); break;
            }
        })
    });
}