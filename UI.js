// (function(){
	// get reference to dropdown
	var ftgSelect = document.getElementById("ftgSelect");
	// get reference to index of dropdown
	var ftgIndex = ftgSelect.selectedIndex;
	// get the value of selected option
	var ftgOption = ftgSelect.options[ftgIndex].value; 
	// get reference to the div to for data to be injected into
	var ftgOutputDiv = document.getElementById("ftgOutput");
	// get a reference to a reset button to reset only the fittings adder
	var resetFtgs = document.getElementById("resetFtgs")
	var errordiv = document.getElementById("error"); 
	var addHead = 0; 
	
	ftgSelect.addEventListener("click", function(){
		ftgIndex = ftgSelect.selectedIndex;
		ftgOption = ftgSelect.options[ftgIndex].value;
		getPipeSize(); 
		if(ftgOption === "90")
		addHead += fittings[pipeSizeString].elbow90
		
		if(ftgOption === "45")
		addHead += fittings[pipeSizeString].elbow45
		
		if(ftgOption === "T")
		addHead += fittings[pipeSizeString].tee
		
		// console.log(ftgOption, addFtg);
		ftgOutputDiv.innerHTML = "<p>"+ pipeSize +" inch " + ftgSelect.options[ftgIndex].textContent + " added " + "<br> total head is now: " + Math.round(addHead) + " feet</p>";

	});	

	resetFtgs.addEventListener("click", function(){
		addHead = 0; 
		ftgOutputDiv.innerHTML = ""; 
	})
		

		

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
	var removeLastBtn = document.getElementById("removeone");


	
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
				pipeSizeString = pipeSizeSelection[i].id;
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
				if(textInputs[i].id === "shallowDepth" && textInputs[i].value !== "" && textInputs[3].value === "")
					var shallow = parseFloat(textInputs[i].value);
				if(textInputs[i].id === "deepEndDepth" && textInputs[i].value !== "" && textInputs[3].value === "")
					var deep = parseFloat(textInputs[i].value);

				if(shallow && deep && !avgdepth){
					avgdepth = avgDepth(shallow,deep);
					textInputs[3].value = avgdepth;
				}


			}
				

			
		poolBranch.push(new Pool(getShape(), turnover, length, width, avgdepth, pipeSize, pipeLength, getPipeSize()));
			

		for(var i = 0; i < poolBranch.length; i++){
			poolBranch[i].headLossAdder(addHead);
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
			if(avgdepth){

				avgdepth = avgdepth * 2
				avgdepth = avgdepth/2;
				textInputs[4].value = avgdepth; 
				textInputs[5].value = avgdepth;   
				
			} 

			if(textInputs[i].value === ""){
				errordiv.innerHTML = "<h3>Missing Something! Please reset and try again!</h3>";

				setTimeout(function(){
					errordiv.innerHTML = "";

				},2000);
						
			}	
		}

		textInputs[4].value = "";
		textInputs[5].value = "";
		textInputs[6].value = "";

		
	}


	function reset(){
		outputDiv.innerHTML = "";
		poolBranch = [];
		ftgOutputDiv.innerHTML = "";
		addHead = 0; 
	}


	function removeLast(){
		var branch = outputDiv.lastChild.previousElementSibling; 
		if(!branch){
			var lastBranch = outputDiv.lastChild
			outputDiv.removeChild(lastBranch);
		} else {
			outputDiv.removeChild(branch);
			
		}

		
		
	}
	

				
calcBtn.addEventListener("click", createBranch);
resetBtn.addEventListener("click", reset);	
removeLastBtn.addEventListener("click", removeLast);



			
// })();	