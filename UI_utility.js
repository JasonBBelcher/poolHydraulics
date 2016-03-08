	var showinfo = document.getElementById("showinfo");
	var shape = "";
	var poolInputsArr = [];
	var poolObjects = [];
	var poolFormInputs = poolForm.elements["entered_values"];
	var shapesSelector = poolForm.elements["shapes"];
		
	
	
	function createElement(el, text, appendTo){
		elem = document.createElement(el);
		textNode = document.createTextNode(text);
		elem.appendChild(textNode);
		document.querySelector(appendTo).appendChild(elem);
	}

	function removeElements(els){
		for (var i = 0; i < els.length; i++){
			els[i].parentNode.removeChild(els[i]);
		}
	}
		
	function getForm(){
		
		// get reference to form
		var poolForm = document.forms["poolForm"];
		// loop through and find checked shape
		for(var i=0; i < shapesSelector.length; i++){
			if(shapesSelector[i].checked){
				shape = shapesSelector[i].value; 
				break;
			}
		}
		poolInputsArr = [];
		for(var i = 0; i < poolFormInputs.length; i++){
			if (poolFormInputs[i].value !== "" ){
				poolInputsArr.push(parseFloat(poolFormInputs[i].value).toFixed(2));
			} 
		}
		

		buildObjForm();	

		function buildObjForm(){
				poolObjects = [];

				function checkInput(){
					var checkCount = 0;
					for(var j = 0; j < poolFormInputs.length; j++){
								
							if(poolFormInputs[j].value === NaN || poolFormInputs[j].value === ""){
								poolObjects = [];
								showinfo.innerHTML = "";

							} else {
								
								checkCount++;
							}
					}
					console.log(checkCount);

					if(checkCount === 6){
						poolObjects.push(new Pool(shape, poolInputsArr[0], poolInputsArr[1], poolInputsArr[2], poolInputsArr[3],poolInputsArr[4],poolInputsArr[5]));
						
					}
				}	

				checkInput();

				showinfo.textContent = "";
					console.log(poolObjects);
				var pipeInnerDia = ["1.61", "2.067", "2.47", "3.07", "4.03", "6.67", "7.98"]	
				
				for(var i = 0; i < poolObjects.length; i++){
					createElement("span", "Created Pool ", "#showinfo");
					createElement("p", " gallons: " + poolObjects[i].getGallons() , "#showinfo");
					createElement("p", " flowrate: " + poolObjects[i].getflowRate() , "#showinfo");
					createElement("p", " Velocity in fps: " + poolObjects[i].getVelocity() , "#showinfo");
					createElement("h4", "Select pipe for Headloss Calculation", "#showinfo");
					createElement("select", "", "#showinfo");
					var select = document.getElementsByTagName("select"); 
					select[i].setAttribute("id", "selectForHeadloss");
					createElement("option", "1 1/2", "select");
					createElement("option", "2", "select");
					createElement("option", "2 1/2", "select");
					createElement("option", "3", "select");
					createElement("option", "4", "select");
					createElement("option", "6", "select");
					createElement("option", "8", "select");
					var options = document.getElementsByTagName("option");
					var selectbox = document.getElementById("selectForHeadloss");
					
					selectbox.addEventListener("click", function(){
						
						
						createElement("p", "friction loss in feet of head: " + poolObjects[0].getHeadLoss(this.options[this.selectedIndex].value), "#showinfo");
						
					});
					for(var j = 0; j < options.length; j++){
					options[j].setAttribute("value", pipeInnerDia[j]);
						
					}

					

					

				}


					
				
		}
					
		function reset(){
			 
			 shape = "";
			 poolInputsArr = [];
			 poolObjects = [];
			 showinfo.textContent = "";	
			for(var i = 0; i < poolFormInputs.length; i++){
				poolFormInputs[i].value = "";
			}

		}
					

		resetbtn.addEventListener("click", reset);
	}






	

	var createPoolbtn = document.querySelector('input[name="calculate"]');
	var resetbtn = document.querySelector('input[name="reset"]');

	createPoolbtn.addEventListener("click",getForm);
			
			
				

			



	

