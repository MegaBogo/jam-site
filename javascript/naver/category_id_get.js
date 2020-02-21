function getCatAll() {


    var results  = [
        ['1차분류','2차분류','3차분류','4차','카테고리ID']
    ];
    var depth1 = document.querySelector('.category_tit').textContent;
    var depth2 = '';  
    var depth2 = '';  
    var depth3 = '';
    var depth4 = '';

    var ctColList = document.querySelectorAll('.category_col');
    
    results.push([depth1,'','','',window.location.href.split('?')[1].replace('cat_id=','')]);

    for(var i=0; i<ctColList.length; i++) {

        try {
            //col = document.querySelectorAll('.category_col')[i].classList[1]+'\r\n';
            ctCol = ctColList[i];
            catTitle = ctCol.querySelector('h3 a');

            if( catTitle == null ) break;

            ctList = ctCol.querySelectorAll('.category_list li');
    
            depth2 = catTitle.text.replace('보기','');
            title = catTitle.href.split('?')[1].replace('cat_id=','')+'\r\n';
    
            results.push([depth1, depth2,'','',catTitle.href.split('?')[1].replace('cat_id=','')]);
    
            text = '';
            href = '';
            for(var j=0; j<ctList.length; j++) { 
                var a = ctList[j].querySelector('a');
                var isDept3 = a.parentElement.parentElement;
    
                text = a.text;
                var depth3 = '';
                var depth4 = '';
    
                if( isDept3.classList.length == 0) {
                depth3 = isDept3.parentElement.querySelector('a').text;
                depth4 = a.text;
                } else {
                depth3 = a.text;
                }          
                results.push([depth1, depth2,depth3,depth4,a.href.split('?')[1].replace('cat_id=','')]);
    
            }            
        } catch (error) {
            console.log(error);            
        }
    }
  
    var lineArray = [];
    results.forEach(function(infoArray, index) {
        var line = infoArray.join(" \t");
        lineArray.push(index == 0 ? line : line);
    });
  
    var csvContent = lineArray.join("\r\n");

    var excel_file = document.createElement('a');
    //var blob = new Blob(["\ufeff"+csvContent], {type: 'text/csv;charset=utf-8;'});
    var blob = new Blob(["\ufeff"+csvContent], {type: 'data:application/vnd.ms-excel;charset=utf-8;'});
    var url = URL.createObjectURL(blob);
    excel_file.href = url;
    excel_file.setAttribute('download', depth1+'.xls');
    document.body.appendChild(excel_file);
    excel_file.click();
    document.body.removeChild(excel_file);
  
  }
