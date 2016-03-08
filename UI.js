(function(){


	// get reference to entire form 
	var branchForm = document.forms["poolBranchForm"];
	// get reference to selected shape
	var shapeSelection = branchForm["poolShape"];
	// get reference to inner pipe dia 
	var pipeSizeSelection = branchForm["headloss"];
	// get reference to all text inputs
	var textInputs = document.querySelectorAll("input[type=text]");
	// store pool branch objects in arr
	var poolBranch = []; 
	// place to output a table of stats
	var outputDiv = document.getElementById("branchOutput");
	// match inner diameter of pipe with pipe size 
	var pipeSize = 1.5;
	// get reference to calc and reset button; 
	var calcBtn = document.getElementById("calcBtn");
	var resetBtn = document.getElementById("resetBtn");
	// get radio button shape selection
	function getShape(){
		var shapesLength = shapeSelection.length;
		for(var i = 0; i < shapesLength; i++){
			if(shapeSelection[i].checked === true){
				return shapeSelection[i].value;
			}
		}
	}

	// match inner diameter of pipe with pipe size
	function getPipeSize(){
		var pipeSizeLength = pipeSizeSelection.length;
		for(var i = 0; i < pipeSizeLength; i++){
			if(pipeSizeSelection[i].checked === true){
				pipeSize = parseFloat(pipeSizeSelection[i].id); 
				return pipeSizeSelection[i].value;
			}

		}
	}
			
			
		
			

	function createBranch(){



		for(var i = 0; i < textInputs.length; i++){
				
				if(textInputs[i].id === "Length")
					var length = parseFloat(textInputs[i].value);
				if(textInputs[i].id === "Width")
					var width = parseFloat(textInputs[i].value);
				if(textInputs[i].id === "turnover")
					var turnover = parseFloat(textInputs[i].value);
				if(textInputs[i].id === "averageDepth")
					var avgdepth = parseFloat(textInputs[i].value);
				if(textInputs[i].id === "pipeLength")
					var pipeLength = parseFloat(textInputs[i].value);
				if(textInputs[i].id === "shallowDepth" && textInputs[i].value !== "")
					var shallow = parseFloat(textInputs[i].value);
				if(textInputs[i].id === "deepEndDepth" && textInputs[i].value !== "")
					var deep = parseFloat(textInputs[i].value);

				if(shallow && deep){
					avgdepth = avgDepth(shallow,deep);
					textInputs[3].value = avgdepth;
				}
				
			}
				
			
			
		

			
		poolBranch.push(new Pool(getShape(), turnover, length, width, avgdepth, pipeSize, pipeLength, getPipeSize()));

		for(var i = 0; i < poolBranch.length; i++){
			
			var tableoutput = '<tr>';
			tableoutput += '<td>Gallons: ' + poolBranch[i].getGallons();
			tableoutput += '</td>';
			tableoutput += '<td>Flow Rate: ' + poolBranch[i].getflowRate();
			tableoutput += '</td>';
			tableoutput += '<td>Velocity: ' + poolBranch[i].getVelocity();
			tableoutput += '</td>';
			tableoutput += '<td>Skimmers Req: ' + poolBranch[i].getSkimmers();
			tableoutput += '</td>';
			tableoutput += '<td>Skimmer Flow Rate: ' + poolBranch[i].skimmerFlowRate();
			tableoutput += '</td>';
			tableoutput += '<td>Friction Loss in ft of head: ' + poolBranch[i].getHeadLoss();
			tableoutput += '</td>';
			tableoutput += '</tr>';
		}
			outputDiv.innerHTML += tableoutput;
		

		for(var i = 0; i < textInputs.length; i++){
			if(textInputs[i].value === NaN || textInputs[i].value === ""){
						outputDiv.innerHTML = "Missing Something!";
						setTimeout(function(){
							outputDiv.innerHTML = "";

						},1000);
						
					}	
		}
	}


	function reset(){
		outputDiv.innerHTML = "";
		poolBranch = []; 
	}
			
			
calcBtn.addEventListener("click", createBranch);
resetBtn.addEventListener("click", reset);		
			
})();	