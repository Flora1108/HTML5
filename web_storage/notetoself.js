window.onload = init;
function init(){	
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
	//获取包含localStorage中所有键的数组
	var stickiesArray = getStickiesArray();
	//迭代处理这个数组
	for (var i = 0;i < stickiesArray.length;i++) {
		//获取各个键
		var key = stickiesArray[i];
		//通过键获取localStorage中对应的值
		var value = JSON.parse(localStorage[key]);
		//将值添加到DOM中
		addStickyToDOM(key,value);
	}
}
function getStickiesArray(){
	//首先从localStorage中得到数据项"stickiesArray"
	var stickiesArray = localStorage.getItem("stickiesArray");
	//第一次加载时，没有"stickiesArray"数据项
	if (!stickiesArray) {
		//创建一个空数组，并将它存入localStorage
		stickiesArray = [];
		//要先将数组转换为字符串传入localStorage
		localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
	}else{
		//如果该数组存在，在localStorage中找到该数组，并将它转换成一个javascript数组
		stickiesArray = JSON.parse(stickiesArray);
	}
	//返回数组
	return stickiesArray;
}
function createSticky(){
	//先获取数组
	var stickiesArray = getStickiesArray();
	//为新的键值对按照时间定义键名
	var currentDate = new Date();
	//获取选中的颜色
	var colorSelectObj = document.getElementById("note_color");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	var key = "sticky_"+currentDate.getTime();
	//获取文本输入框中的数据作为键对应的值
	var value = document.getElementById("note_text").value;
	var stickyObj = {
		"value":value,
		"color":color
	};
	localStorage.setItem(key,JSON.stringify(stickyObj));
	//将该键值对存入localStorage中
	localStorage.setItem(key,value);
	//将新键增加到数组中。
	stickiesArray.push(key);
	//将数组转换成字符串，覆盖localStorage中原有的stickiesArray值
	localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
	//将该键值对的值展示在页面上
	addStickyToDOM(key,stickyObj);
}
function addStickyToDOM(key,stickyObj){
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
	//为Dom中表示即时贴的<li>元素
	sticky.setAttribute("id",key);
	sticky.style.backgroundColor = stickyObj.color;
	var span = document.createElement("span");
	span.setAttribute("class","sticky");
	span.innerHTML = stickyObj.value;
	sticky.appendChild(span);
	stickies.appendChild(sticky);
	//点击一个即时贴时，就会调用deleteSticky函数删除该即时贴
	sticky.onclick = deleteSticky;
}
function deleteSticky(e){
	var key = e.target.id;
	//删除span的父元素<li>元素
	if (e.target.tagName.toLowerCase() == "span") {
		key = e.target.parentNode.id;
	}
	//在localStorage中删除该数据项
	localStorage.removeItem(key);
	//在stickiesArray数组中删除该项
	var stickiesArray = getStickiesArray();
	if (stickiesArray) {
		for (var i = 0;i<stickiesArray.length;i++) {
			if (key == stickiesArray[i]) {
				stickiesArray.splice(i,1);
			}
		}
	}
	//将新的数组重新存储在localStroage中。
	localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
	removeStrickyFromDOM(key);
}
//在页面中删除该即时贴
function removeStrickyFromDOM(key){
	var sticky = document.getElementById(key);
	sticky.parentNode.removeChild(sticky);
}
