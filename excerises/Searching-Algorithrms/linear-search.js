// finding sequential 
// Time - O(N)
//  

// indexOf() in array uses linear search for finding 
// find()
// findIndex()
// includes()

var beasts = ['Centaur', 'Godzilla', 'Mosura', 'Minotaur', 'Hydra', 'Nessie'];

beasts.indexOf('Godzilla');

beasts.findIndex(function(item){
  return item === 'Godzilla';
});

beasts.find(function(item){
  return item === 'Godzilla';
})

beasts.includes('Godzilla')

function linerSearch(arr, val) {
  for(var i=0;i<arr.length;i++) {
    if(arr[i] === val) return i;
  }
  return -1;
}