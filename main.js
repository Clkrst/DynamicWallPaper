var show_particles = true;

window.wallpaperPropertyListener = {
	applyUserProperties: function (properties) {
		console.log("111");
		var cvs = document.getElementById('cvs');
		if (properties.screenFile) {
			if (properties.screenFile.value) {
				filename = 'file:///' + properties.screenFile.value;
				var img_dom = document.getElementById("back_img");
				img_dom.setAttribute("src",filename);
			}
		}
		if (properties.whether_show_particles) {
			wh_show = properties.whether_show_particles.value;
			var back_div = document.getElementById("particles-js");
			if (back_div){
				if (wh_show == true){
					back_div.style.visibility = "visible";
				}else{
					back_div.style.visibility = "hidden";
				}
			}
		}
		if (properties.delete_particles) {
			wh_delete = properties.delete_particles.value;
			if (wh_delete == true){
				var back_div_to_delete = document.getElementById("particles-js");
				if (back_div_to_delete){
					var body_temp = document.getElementById("body_test");
					back_div_to_delete.parentNode.removeChild(back_div_to_delete);
				}
			}
		}
	}
}

if (window.wallpaperRegisterAudioListener) {
	window.wallpaperRegisterAudioListener(function (audioData) {
		console.log("1")
	});
}

