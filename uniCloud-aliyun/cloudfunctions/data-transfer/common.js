 function newsshuffle(newList){
	 let index=0;	
	 newList = newList.map(x=>{
	 	x.imgPath=[];
	    //  if(x.cover)
	 	     // x.imgPath=[x.cover];
	 	if(x.content){
	 		let str=x.content;
	 		let result = str.match(/<img src="(\S*)"\stitle="\S*"\salt="\S*"/gs);
	 		for(let r in result){
	 			   x.imgPath.push(result[r].match(/<img src="(\S*)"\stitle="\S*"/)[1]);
	 		}	 		
	 	}
	 	if(x.imgPath.length<3&&x.imgPath.length>0){					
	 		x.imgPath=x.imgPath.slice(0,1);
	 		x.type=Math.round(Math.random())+1;
	 	}else if(x.imgPath.length>=3){
	 		x.imgPath=x.imgPath.slice(0,3);
	 		x.type=3
	 		index=0
	 	}
	 	if(index==5)
	 	      index=0;
	 	index++;
		if(x.videoPath){
			if(x.cover)
			  x.imgPath=[x.cover];
			else
			  x.imgPath=x.imgPath[0]?imgPath[0]:["https://fuyin.fuxinbank.com:10054/gms/UpLoad/NewsImg/20210411/1618135803567012466.jpg"]
			x.type=3;
		}
	    return x;
	 });	
     return newList; 
 } 
module.exports=newsshuffle