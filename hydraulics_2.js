// Formulas for Pool Hydraulics 

function waterVelocity(flowrate, pipeSize){
	var fps =  parseFloat(0.408 * flowrate / square(pipeSize)).toFixed(2);
	return fps; 
}


function area(l,w){
	return l * w; 
}

function square(x){
	return x * x; 
}

function circleArea(r){
	return Math.round((square(r)) * Math.PI); 
}

function rightTriangle(l,w){
	return area(l,w) / 2; 
}

// average depth of pool 

function avgDepth(min, max){
	return  (min + max) / 2;
}


function Pool(shapes,turnoverHours, l, w, avgdepth, pipesize, pipelength) {
	
	this.shapes         = shapes;
	this.turnoverHours  = turnoverHours;
	this.l              = l;
	this.w              = w; 
	this.avgdepth       = avgdepth; 
	this.pipesize       = pipesize;
	this.pipelength     = pipelength;
	this.ftgsize        = pipesize; 
	this.headcount      = [];
	this.totalhead      = 0;
	this.perimeter      = parseFloat(this.l) + parseFloat(this.w);
	this.skimmers       = null;
}
	
	
Pool.prototype.ftgSelect = {

		"1.5" : {
				
				elbow90: 4.0,
				elbow45: 2.1, 
				teeThru: 2.7,
				tee:     8.4,
				checkValve: 15.2     


			},

			"2": {
				
				elbow90: 5.7,
				elbow45: 2.6, 
				teeThru: 4.0,
				tee:     12,
				checkValve: 19.1     


			}
	}


	
Pool.prototype.getflowRate = function(){
	
	var mins = this.turnoverHours * 60; 
	var flowrate = parseFloat(this.getGallons() / mins).toFixed(2);
	return flowrate; // in gallons per minute

}

Pool.prototype.getGallons = function(){


	if(this.shapes === 'rect'){
		return this.l * this.w * this.avgdepth * 7.5; 
	} else if (this.shapes === 'oval'){
		return this.l * this.w * this.avgdepth * 6.7;
	} else if (this.shapes === 'kidney') {
		return this.l * this.w * this.avgdepth * 7.0; 
	} else {
		console.log("You need to specify a shape: ['rect']['oval']['kidney'] ")
		return 0;
	}
}


Pool.prototype.updatePoolShape = function(obj,shape){
	
	return obj.shapes = shape; 
}








// // d = inside diameter (inch) see pipe size chart 

Pool.prototype.getHeadLoss = function(d){
	   if(!d){
	   	return "Cannot Calculate without an inner diameter."
	   } else {
		   console.log(d);
		   var c = 150;
		   var hL =  0.2083 * (Math.pow(100/c, 1.852))  * (Math.pow(this.getflowRate(), 1.852)) / (Math.pow(parseFloat(d), 4.8655))
		   var totalheadloss = parseFloat(this.totalhead + (this.pipelength / 100) * hL).toFixed(2);
		   console.log("You have " + totalheadloss + " total friction loss ");
		   return  totalheadloss;
	   }
}
		   
		   	
	 


Pool.prototype.getVelocity = function(){
	
	var fps =  parseFloat(0.408 * this.getflowRate() / square(this.pipesize)).toFixed(2);
	return fps; 
}

Pool.prototype.headLossAdder = function(){
	// argArr = [];	

	for(var arg = 0; arg < arguments.length; arg++){
		this.headcount.push(arguments[arg]);
	}

	for(var i = 0; i < this.headcount.length; i++){
		this.totalhead += this.headcount[i]; 
	}

	return "you now have " + parseFloat(this.totalhead).toFixed(2) + " feet of head loss."
}

Pool.prototype.headLossDelete = function(){
	

	this.headcount = []; 
	this.totalhead = 0;
	
	return "DELETED!";
			
		
}


Pool.prototype.headLossRemoveOne = function(el){
		var loopcount = 0; 
		for(var i = 0; i < this.headcount.length; i++){
			if(loopcount < 1){
				if(this.headcount[i] === el){
					
				 	var elementRemoved = this.headcount.splice(i, 1);
				 	loopcount++;
				} 
				
			} 
		}	 	
			// update totalhead
			var newTotalhead = 0;
			for(var i = 0; i < this.headcount.length; i++){
				newTotalhead += this.headcount[i]; 
				newTotalhead = this.totalhead;

			}
	if(loopcount === 0){
		
		return "no match: did not remove item";
		
	} else {
		
		return "You have removed " + loopcount + ":  item";		
	}		
		
}

Pool.prototype.skimmerFlowRate = function(){
	
	if(!this.skimmers){
		this.numSkimmers();
	}

	var gpm = this.getflowRate()/this.skimmers;
	if(gpm < 25){
		console.log("Your flowrate is: " + gpm + " increase design flow rate!");
		
	} else {

		return Math.ceil(gpm); 
	}

}

Pool.prototype.poolArea = function(){
	return this.l * this.w
}


Pool.prototype.numSkimmers = function(shape){
	// returns sqr footage per skimmer 

	if(shape === "wading"){
		var skimmers = this.poolArea() / 200;
	} else {
		 	skimmers = this.poolArea() / 500; 
	}

	this.skimmers = Math.ceil(skimmers)
	return this.skimmers;
}
	

	


	
		
	

	
		
		
		
	

	
			
		

	











