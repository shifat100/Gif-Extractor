/*try {*/
    var header = document.getElementsByClassName('header')[0];
    var f1 = document.getElementsByClassName('footerelement')[0];
    var f2 = document.getElementsByClassName('footerelement')[1];
    var f3 = document.getElementsByClassName('footerelement')[2];
    var filename = '';
    document.getElementById('image-input').addEventListener('change', function () {
        var ele = document.querySelector('input[type=file]')['files'][0];
        var reader = new FileReader();
        reader.onload = function () {
            console.log(reader.result.split(';')[0].replace('data:image/',''));
            if(reader.result.split(';')[0].replace('data:image/','') == 'gif') {
            document.getElementById('menubar').style.display = 'none';
            document.getElementById('app').innerHTML = '<div class="image-preview"><center><img style="max-width: 234px; max-height: 205px; border: 1px solid black; padding: 2px" src="' + reader.result + '" id="imgdata" rel:animated_src="' + reader.result + '" rel:auto_play="4"></center></div>';



            var dest = new Image();
            dest.src = reader.result;
            dest.onload = function () {
                filename = ele.name;
                document.getElementById('app').innerHTML += '<div class="image-information"><center><div class="filename">' + ele.name + '</div></center><b>Width:</b> ' + this.width + ' px<br><b>Height:</b> ' + this.height + ' px<br><span id="totalframe"></span></div>';
                f1.innerHTML = '';
                f2.innerHTML = 'Pause';
                f3.innerHTML = 'Delete';

                var sup1 = new SuperGif({ gif: document.getElementById('imgdata') }), proceed = sup1.loadFirst(); proceed.done = function () { sup1.play() }, setTimeout((function () { proceed.forth() }), 1e3), document.querySelector('canvas').style = 'max-width: 234px; max-height: 205px;', document.getElementById('totalframe').innerHTML = '<b>Animation:</b> ' + sup1.get_playing();

                document.body.removeEventListener('keydown', keydownmenubar);
                document.body.removeEventListener('keydown', function (e) {
                    var f2value = f2.innerHTML;
                    if (e.key == 'Enter') { if (f2value == 'Play') { sup1.play(); document.getElementById('totalframe').innerHTML = '<b>Animation:</b> ' + sup1.get_playing(); document.querySelector('canvas').style = 'max-width: 234px; max-height: 205px;'; f2.innerHTML = 'Pause'; f1.innerHTML = ''; } else { sup1.pause(); document.getElementById('totalframe').innerHTML = '<b>Animation:</b> ' + sup1.get_playing(); document.querySelector('canvas').style = 'max-width: 234px; max-height: 205px;'; f2.innerHTML = 'Play'; f1.innerHTML = 'E. Frame'; } }
                    if (e.key == 'ArrowLeft') { sup1.move_relative(-1); }
                    if (e.key == 'ArrowRight') { sup1.move_relative(1); }
                    if (e.key == 'SoftLeft' || e.key == 'F1') { saveimg(filename.replace(/.gif/g, '_' + sup1.get_current_frame() + '.png'), document.querySelector('canvas').toDataURL()); }
                    if (e.key == 'SoftRight' || e.key == 'F2') { window.location.reload(); }
                });
                document.body.addEventListener('keydown', function (e) {
                    var f2value = f2.innerHTML;
                    if (e.key == 'Enter') { if (f2value == 'Play') { sup1.play(); document.querySelector('canvas').style = 'max-width: 234px; max-height: 205px;'; f2.innerHTML = 'Pause'; f1.innerHTML = ''; } else { sup1.pause(); document.querySelector('canvas').style = 'max-width: 234px; max-height: 205px;'; f2.innerHTML = 'Play'; f1.innerHTML = 'E. Frame'; } }
                    if (e.key == 'ArrowLeft') { sup1.move_relative(-1); }
                    if (e.key == 'ArrowRight') { sup1.move_relative(1); }
                    if (e.key == 'SoftLeft' || e.key == 'F1') { saveimg(filename.replace(/.gif/g, '_' + sup1.get_current_frame() + '.png'), document.querySelector('canvas').toDataURL()); }
                    if (e.key == 'SoftRight' || e.key == 'F2') { window.location.reload(); }
                });
            }
        } else { alert('Not A Valid gif Image File'); }
    }
        reader.readAsDataURL(ele);
        
    });


    function openmenubar() {
        document.getElementById('menubar').style.display = 'block';
        document.querySelectorAll('.menuelement')[0].focus();
        f3.innerHTML = 'Back';
        document.body.removeEventListener('keydown', keydownmain);
        document.body.addEventListener('keydown', keydownmenubar);
    }
    function closemenubar() {
        document.getElementById('menubar').style.display = 'none';
        document.body.removeEventListener('keydown', keydownmenubar);
        document.body.addEventListener('keydown', keydownmain);
        f3.innerHTML = 'Exit';
    }




    function saveimg(name, content) {
        var a = document.createElement('a');
        a.href = content;
        a.download = name;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    function help() {
        header.innerHTML = 'Help';
        document.getElementById('app').innerHTML = '<div style="font-size: 15px; line-height: 25px; width: 80%; margin: 20px auto">1. Add Photo <br> 2. Click Pause<br>3. Find Frame Using Arrow Key<br> 4. Click E. Frame</div>';
        f1.innerHTML = '';
        f2.innerHTML = '';
        f3.innerHTML = 'Back';
        document.getElementById('menubar').style.display = 'none';
        document.body.removeEventListener('keydown', keydownmain);
        document.body.addEventListener('keydown', keydownhelpandabout);
    }
    function about() {
        header.innerHTML = 'About';
        document.getElementById('app').innerHTML = '<br><center><b>Gif To Png</b><br><br>Version 1.0 by shifat100<br><br><br><br><small style="color: red;">* Images Will Be Saved As Png</small></center>';
        f1.innerHTML = '';
        f2.innerHTML = '';
        f3.innerHTML = 'Back';
        document.getElementById('menubar').style.display = 'none';
        document.body.removeEventListener('keydown', keydownmain);
        document.body.addEventListener('keydown', keydownhelpandabout);
    }



    document.body.addEventListener('keydown', keydownmain);


    function keydownmain(e) {
        switch (e.key) {
            case 'F1': openmenubar(); break;
            case 'SoftLeft': openmenubar(); break;
            case 'F2': window.close(); break;
            case 'SoftRight': window.close(); break;
        }
    }

    function keydownmenubar(e) {
        switch (e.key) {
            case 'ArrowUp': focus(-1); break;
            case 'ArrowDown': focus(1); break;
            case 'Enter': document.activeElement.click(); break;
            case 'F2': closemenubar(); break;
            case 'SoftRight': closemenubar(); break;
        }

        function focus(move) {
            var currentIndex = document.activeElement.tabIndex;
            var next = currentIndex + move;
            if (next > document.querySelectorAll('.menuelement').length - 1) { next = 0; } else if (next < 0) { next = document.querySelectorAll('.menuelement').length - 1; }
            var items = document.querySelectorAll('.menuelement');
            var targetElement = items[next];
            targetElement.focus();
            targetElement.scrollIntoView({ block: 'center' });
        }
    }


    function keydownhelpandabout(e) {
        switch (e.key) {
            case 'SoftRight': window.location.reload(); break;
            case 'F2': window.location.reload(); break;
        }
    }

/*} catch (err) {
    alert(err.message);
}*/


document.addEventListener('DOMContentLoaded', () => {
    getKaiAd({
        publisher: '080b82ab-b33a-4763-a498-50f464567e49',
        app: 'Gif_Extractor',
        slot: 'Gif_Extractor',
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {
            ad.call('display');
        }
    });
});