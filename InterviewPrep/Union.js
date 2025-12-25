function search(arr,l,r,x) {
    if(r>=1){
      let mid = 1+Math.floor((r-1)/2)
      if(arr[mid]==x){
        return mid;
      }
      if(arr[mid]>x){
        return search(arr,l,mid-1,x);
      }
      return search(arr,mid+1,r,x)
    }
    return -1;
    
  }
  
  function union(arr1,arr2,m,n){
    if(m>n){
      let temp = arr1;
      arr1 = arr2;
      arr2 = temp;
  
      let temp2 = m;
      m  = n;
      n = temp2;
      
    }
    arr1.sort((a,b)=>a-b);
    for(let i=0;i<m;i++)
       console.log(arr1[i]+" ")
  
    for(let i=0;i<n;i++){
  
      if(search(arr1,0,m-1,arr2[i])==-1)
  
           console.log(arr2[i]+" ")
    }
    
    
  
    
  }
  
  let Arr1 = [2,4,5,6]
  let leng1 = Arr1.length;
  
  let Arr2 = [1,4,3, 5]
  let leng2 = Arr2.length;
  union(Arr1,Arr2,leng1,leng2)
//   var res = union(Arr1,Arr2,leng1,leng2)
//   console.log(res)
  // Arr1 unions Arr2 = [ 2,1,4,5,6,3 ]