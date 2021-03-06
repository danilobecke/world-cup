function renderBrackets() {  
    renderRound16();
    renderQuarters();
    renderSemi();
    renderFinal();
}

function renderRound16() {
    let cards = extractCards("#round-16")
    let matches = round16["matches"]
    renderData(matches, cards)
}

function renderQuarters() {
    let cards = extractCards("#quarters")
    let matches = quarters["matches"]
    renderData(matches, cards)
}

function renderSemi() {
    let cards = extractCards("#semi")
    let matches = semi["matches"]
    renderData(matches, cards)
}

function renderFinal() {
    let cards = extractCards("#final")
    let matches = final["matches"]
    renderData(matches, cards)
}

function extractCards(id) {
    return $(id).children().filter(function(index, element) { return $(element).hasClass("card")  })
}

function renderData(matches, cards) {
    matches.forEach(function(match, index) {
        let date = match["date"]
        let first_team = match["first_team"]
        let second_team = match["second_team"]
        if(!first_team) {
            first_team = {"name": "A definir", "acronym": "unknown", "score": null, "winner": false}
        }
        if(!second_team) {
            second_team = {"name": "A definir", "acronym": "unknown", "score": null, "winner": false}
        }
        renderGame(date, first_team, second_team, cards[index])
    });
}

function renderGame(date, first_team, second_team, card) {
    $(card).children().each(function(index, row) {
        switch(index) {
            case 0:
                // date
                $(row).html(date);
                break;
            case 1:
            case 2:
                // teams
                let team;
                if(index == 1) {
                    team = first_team
                } else {
                    team = second_team
                }
                $(row).attr("acronym", team["acronym"])
                $(row).children().each(function(colum_index, column) {
                    switch(colum_index) {
                        case 0:
                            // name & image
                            let children = $(column).children()
                            $(children[1]).html(team["name"])
                            if(team["acronym"] == "unknown") {
                                $(children[0]).removeAttr("src");
                            } else {
                                $(children[0]).attr("src", "https://countryflagsapi.com/png/" + team["acronym"]);
                            }
                            break
                        case 1:
                            // result & winner
                            let children_r = $(column).children()
                            $(children_r[0]).html(team["score"])
                            if(!team["winner"]) {
                                let winnerElement = $(children_r[1])
                                let isEditing = winnerElement.attr("editing") == "true"
                                winnerElement.css("visibility", isEditing ? "visible" : "hidden")
                            } else {
                                $(children_r[1]).css("visibility", "visible")
                            }
                            break
                    }
                })
                break;
        }
    })
}
