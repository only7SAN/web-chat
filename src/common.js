Array.prototype.indexOf = (value) => {
	for(let i=0;i<this.length;i++){
		if(this[i] == value){
			return i;
		}else{
			return -1;
		}
	}
};

Array.prototype.remove = (value) =>{
	let index = this.indexOf(vaule);
	if(index != -1){
		this.splice(index,1);
	}
};

export default Array;