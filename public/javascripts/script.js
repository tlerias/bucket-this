function delete(){
  var confirmation = window.confirm("Are you sure you want to delete this card?");

  if(confirmation === true){
    window.location('/{{card.url_name}}/delete')
  } else{
    return false
  }
}
