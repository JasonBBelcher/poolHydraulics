// Formulas for Pool Hydraulics 


// // gallon calculator that accepts length, width and average depth
// // option will select the shape pool and it's related amount of gallons in 1 cubic foot of water. 

// function calcGallons(option, l, w, avgdepth){
// 	if(option === 'rect'){
// 		return l * w * avgdepth * 7.5; 
// 	} else if (option === 'oval'){
// 		return l * w * avgdepth * 6.7;
// 	} else if (option === 'kidney') {
// 		return l * w * avgdepth * 7.0; 
// 	} else if (!isNaN(arguments[0])|| arguments.length < 4){
// 		return "please enter option:[rect][oval][kidney], length, width avgdepth ";
// 	} else {
// 		return 0; 
// 	}
// }

// // gallon calculator that accepts area and average depth 

// function calcGallons2(option, area, avgdepth){
// 	if(option === 'rect'){
// 		return area * avgdepth * 7.5;
// 	} else if (option === 'oval'){
// 		return area * avgdepth * 6.7; 
// 	} else if (option === 'kidney'){
// 		return area * avgdepth * 7.0; 
// 	} else if (!isNaN(arguments[0])|| arguments.length < 4){
// 		return "please enter option:[rect][oval][kidney], length, width avgdepth ";
// 	} else {
// 		return 0; 
// 	} 
// }

// function volume(area, avgdepth){
	
// 	// cubic feet of volume 
// 	return area * avgdepth;
		
// }
	
// // console.log(volume(circleArea(10), avgDepth(3,8)));	
// // console.log(volume(area(20,40), avgDepth(3,8)));

// // Gallons calculator that accepts volume as input

// function calcGallons3(option, volume){
// 	// returns gallons 

// 	if(option === 'rect' || option === 'circle'){
// 		return volume * 7.5; 
// 	} else if (option === 'oval'){
// 		return volume * 6.7; 
// 	} else if (option === 'kidney'){
// 		return volume * 7.0; 
// 	} else {
// 		return "This is not valid input!";
// 	}
// }


// // console.log(calcGallons3('rect', 4400));
// // console.log(calcGallons3('kidney', volume(area(20,40), avgDepth(4,8))));

// //  use 6 hours for pools with > 2000 square feet 
// //  use 8 hours for limited use residentual pools 

// function flowRate(gallons, turnoverHours){
// 	var mins = turnoverHours * 60; 
// 	var flowrate = parseFloat(gallons / mins).toFixed(2);
// 	return flowrate; // in gallons per minute
// }


// // console.log(flowRate(20000, 8));

// // uses this formula to calculate water velocity through pipe v = 0.408 * Q	/ (D * D)
// // D =Pipe inside diameter (in)
// // Q = Flowrate of water inside pipe (gpm)
// // V = Water velocity inside pipe (ft/second)

// //  calculates velocity and outputs as feet per second

function waterVelocity(flowrate, pipeSize){
	var fps =  parseFloat(0.408 * flowrate / square(pipeSize)).toFixed(2);
	return fps; 
}


// // console.log(waterVelocity(60, 2));



// // q = flow rate (gal/min)
// // d = inside diameter (inch) see pipe size chart 
// function headLoss(pipeLength, q, d ){
//      	// c = design coefficient for PVC 
//        var c = 150;
// 	   var hL =  0.2083 * (Math.pow(100/c, 1.852))  * (Math.pow(q, 1.852)) / (Math.pow(d, 4.8655))
// 	   return parseFloat((pipeLength / 100) * hL).toFixed(2); 
	   
	
// }



	








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


Pool.prototype.updateGallons = function(shapes){
	var poolShapes = ["rect","oval", "kidney"];
	for(var i = 0; i < poolShapes.length; i++){
		if(poolShapes[i] === shapes){
			this.shapes = shapes;
			return "You changed the pool shape to: " + this.shapes;
			
		} else {
			return "This shape is not recognized. Please enter: ['rect']['oval']['kidney'] \n" + "Shape is currently: " + this.shapes + "angle";
		}
	}
	

}

// // d = inside diameter (inch) see pipe size chart 

Pool.prototype.getHeadLoss = function(d){
		var c = 150;
	   var hL =  0.2083 * (Math.pow(100/c, 1.852))  * (Math.pow(this.getflowRate(), 1.852)) / (Math.pow(d, 4.8655))
	  	var totalheadloss = parseFloat(this.totalhead + (this.pipelength / 100) * hL).toFixed(2);
	   console.log("You have " + totalheadloss + " total head ");
	   this.headcount.push(parseFloat(totalheadloss));
	   return  totalheadloss;
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



	
		
	

	
		
		
		
	

	
			
		

	




var aPool = new Pool('rect', 8, 20, 40, 4, 2, 300 );

console.log(aPool.getGallons());
console.log(aPool.getflowRate());
console.log(aPool.getVelocity());
console.log(aPool.getHeadLoss(2.067));
console.log(aPool.headLossAdder(aPool.ftgSelect["2"].elbow90))
console.log(aPool.headLossAdder(aPool.ftgSelect["2"].elbow45))
console.log(aPool.headLossAdder(aPool.ftgSelect["2"].elbow90))
console.log(aPool.headLossAdder(aPool.ftgSelect["2"].elbow90))
console.log(aPool.headcount);
// console.log(aPool.headLossRemoveOne());
// console.log(aPool.headLossRemoveOne(2.6));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));
// console.log(aPool.headLossRemoveOne(aPool.ftgSelect["2"].elbow90));

console.log(aPool.headcount);
console.log(aPool.updateGallons("asdfsafsa"));



// console.log(aPool.ftgsize);
// console.log(aPool.ftgSelect['2'].elbow45);

// console.log(aPool.headLossAdder(3,4,5,6,7,2))


// console.log(aPool.headcount);
// console.log(aPool.totalhead);

// console.log(aPool.headLossRemoveOne(5.7));
// // console.log(aPool.getHeadLoss(2.067));
// console.log(aPool.headcount);
// console.log(aPool.totalhead);






