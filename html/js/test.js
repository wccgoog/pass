function setWidth(item){
    item.style = "width:200px;"
}

setWidth(document.getElementsByClassName('ui-state-default slick-header-column')[3]);
setWidth(document.getElementsByClassName('ui-state-default slick-header-column')[4]);

function setItems(items){
    for(var i = 0; i < items.length; i++){
        setWidth(items[i]);
    };
}

setItems(document.getElementsByClassName('slick-cell l3 r3'));
setItems(document.getElementsByClassName('slick-cell l4 r4'));
