var show_particles = true;
var updateSongInfoHandler = -1;
var audioBarHandler = -1;
var fps = 30;

var songInfo = {};
var AllTimeBak = 0;
var NowBak = 0;
var DrawWarning = false;
var songName = "";
var FormattedTime = "";
var chineseLyric = "";
var rawLyric = "";
var FormattedTimeBox = document.getElementById("FormattedTime");
var ChineseLyricBox = document.getElementById("chinese_lyric");
var RawLyricBox = document.getElementById("raw_lyric");


var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

function receive_audio(audioData) {
    console.log("1")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://127.0.0.1:62333/BGMName", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
            songInfo = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            if (songInfo.AllTime <= 0)
                songInfo.AllTime = AllTimeBak;
            if (songInfo.Now <= 0)
                songInfo.Now = NowBak;

            AllTimeBak = songInfo.AllTime;
            NowBak = songInfo.Now;
            songName = songInfo.AppName;
            // FormattedTime = songInfo.FormattedTime;
            // chineseLyric = songInfo.ChineseLyric;
            // rawLyric = songInfo.Lyric;   
            //processing the lyrics
            FormattedTimeBox.innerText = songInfo.FormattedTime;
            ChineseLyricBox.innerText = songInfo.ChineseLryic;
            RawLyricBox.innerText = songInfo.Lryic;

            DrawWarning = false;
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            DrawWarning = true;
        }
    };
    xhr.send();
}

window.onload = function() {
    setInterval(receive_audio, 250);
}

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        // console.log("111");
        var cvs = document.getElementById('cvs');
        if (properties.screenFile) {
            if (properties.screenFile.value) {
                filename = 'file:///' + properties.screenFile.value;
                var img_dom = document.getElementById("back_img");
                img_dom.setAttribute("src", filename);
            }
        }
        if (properties.whether_show_particles) {
            var wh_show = properties.whether_show_particles.value;
            var back_div = document.getElementById("particles-js");
            if (back_div) {
                if (wh_show == true) {
                    back_div.style.visibility = "visible";
                } else {
                    back_div.style.visibility = "hidden";
                }
            }
        }
        if (properties.delete_particles) {
            var wh_delete = properties.delete_particles.value;
            if (wh_delete == true) {
                var back_div_to_delete = document.getElementById("particles-js");
                if (back_div_to_delete) {
                    var body_temp = document.getElementById("body_test");
                    back_div_to_delete.parentNode.removeChild(back_div_to_delete);
                }
            }
        }
        if (properties.whether_show_audio) {
            var wh_info = properties.whether_show_audio.value;
            var cvs_h = document.getElementById("cvs");
            if (wh_info == true) {
                updateSongInfoHandler = setInterval(receive_audio, 250);
                audioBarHandler = window.requestAnimationFrame(render);
                cvs_h.style.visibility = "visible";
                receive_audio();
            } else {
                cvs_h.style.visibility = "hidden";
                clearInterval(updateSongInfoHandler);
                cancelAnimationFrame(audioBarHandler);
                updateSongInfoHandler = -1;
                audioBarHandler = -1;
            }
        }
    }
}

//绘制音频图线
var data = new Array(128);
var animateData = new Array(128);
//round audio bar
var maxBarLength = 150;
var innerRaduis = 210;
var barNum = 60;
var barWidth = 6;
var round_center = {
    "x": 975,
    "y": 553
};
//audio process bard
var processBarLength = 1300;
var processBarWidth = 5;
//initialization
for (var i = 0; i < 128; i++) {
    data[i] = animateData[i] = 0;
}
if (window.wallpaperRegisterAudioListener) {
    window.wallpaperRegisterAudioListener(function(audioData) {
        var max = 0;
        for (var i = 0; i < 128; i++) {
            if (audioData[i] > max)
                max = audioData[i];
        }
        for (var i = data.length - 1; i >= 0; i--) {
            data[i] = audioData[i] * (maxBarLength / max);
        }
    });
}

function min(a, b) {
    return a > b ? b : a;
}


function render() {
    ctx.clearRect(0, 0, 4000, 2400);
    ctx.scale(2, 2);
    ctx.fillStyle = "#01FECE";
    ctx.save();
    ctx.translate(round_center.x, round_center.y);
    //round audio sound bar
    var value;
    var position_now = (NowBak / AllTimeBak) * processBarLength;
    for (var i = 0; i < barNum; i++) {
        value = data[i];



        ctx.moveTo(innerRaduis, 0);
        ctx.beginPath();
        ctx.arc(innerRaduis, barWidth / 2, barWidth / 2, -Math.PI / 2, Math.PI / 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(innerRaduis, 0, value + 10, barWidth);
        //// ctx.beginPath();
        //// ctx.arc(innerRaduis + value, barWidth / 2, barWidth / 2, Math.PI / 2, -Math.PI / 2, true);
        //// ctx.fill();
        ctx.rotate(Math.PI / (barNum / 2));
    }
    //audio process bar
    ctx.fillStyle = "#03FFD33F";
    ctx.beginPath();
    ctx.fillRect(-processBarLength/2,0,processBarLength,processBarWidth);
    ctx.fillStyle = "#03FFD3";
    ctx.beginPath()
    ctx.fillRect(-processBarLength/2,0,position_now,processBarWidth);
    ctx.beginPath()
    ctx.arc(-processBarLength/2+position_now,processBarWidth/2,5,0,2*Math.PI,true);
    ctx.fill();

    ctx.restore();
    ctx.scale(0.5, 0.5);
    audioBarHandler = window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);

