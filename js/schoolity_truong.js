$(".alert").hide()
function showDialog(){
    setTimeout(function(){},1000);
    let search = $(".search-addvance");
    if(search.hasClass("fade-out")){
        $(search).removeClass("fade-out");
          $(search).addClass("fade-in");
    }else{
        $(search).removeClass("fade-in");
          $(search).addClass("fade-out");
    }
    
}
function xemhs(e){
   if(e=='chung'){
    $('#ttgd,#ttcn').attr('hidden','true');
    $('#ttchung').removeAttr('hidden');
   }
   if(e=='canhan'){
       $('#ttgd,#ttchung').attr('hidden','true');
       $('#ttcn').removeAttr('hidden');
   }
   if(e=='gd'){
    $('#ttcn,#ttchung').attr('hidden','true');
    $('#ttgd').removeAttr('hidden');
   }
}

// Listen to hide dialog
window.addEventListener('mousedown',function(e){
    let search = $(".search-addvance");
    if (!search.is(e.target) && search.has(e.target).length === 0) 
    {
        $(search).removeClass("fade-in");
        $(search).addClass("fade-out");
    }
}); 
function showAlert(selector) {
    // them class show cho alert
    $(selector).addClass('show') //Shows Bootstrap alert
    $(selector).show() //Shows Bootstrap alert
    setTimeout(function () {
        $(selector).removeClass('show')
        $(selector).hide()
    }, 1000);
}
// ham de hien thi alert danger
function showAlerthanhcong() {
    // goi ham chung de show alert: ID = alert-danger
    showAlert('#alert-thanhcong')
}
var idCheckList = new Array();
function showAlertdienthongtin() {
    showAlert('#alert-dienthongtin')
}
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    showAlertdienthongtin()
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
visibleAdvanceSearch = false;
$(document).ready(function () {
    $(window).click(function (e) {
        // Show or hide button "XEM HO SO"
        if(e.target.className.indexOf("ho_ten")==!0){
            $("button[id=xem_ho_so]").css("visibility", "hidden");
            $("#xem_ho_so").html("ok");
        }else{
            $("button[id=xem_ho_so]").css("visibility", "hidden");
            $(`button[id=xem_ho_so][index=${e.target.getAttribute("index")}]`).css("visibility", "visible");
        }
        // if (e.target.id === "xem_ho_so")
        //     $("#nav-tabContent").html('<div ng-include="TabLayout[0]" />');
    });
    
    https://stackoverflow.com/questions/18537609/jquery-checkbox-check-all
    $("#checkAll").click(function () {
        let currentId = this.id;
        if ($(this).prop("checked")) {
            console.log("checked");
            $('input:checkbox').not(this).prop('checked', this.checked);
            $('input:checkbox:checked').each(function(index) {
                if (this.id !== currentId && !idCheckList.includes(this.id))
                {
                    idCheckList.push(this.id);
                }
            });
        } else {
            console.log("unchecked!");
            $('input:checkbox').not(this).prop('checked', false);
            $('input:checkbox').each(function(index) {
                if (this.id !== currentId && idCheckList.includes(this.id))
                {
                    idCheckList.splice(idCheckList.indexOf(this.id), 1);
                }
            });
        }
        delstate();
        alert(idCheckList);
    });
    // handle show hide button delete
    // mac dinh: hide
    // bat su kien khi click vao bat ky checkbox
});
    
function singleCheckBox(checkBoxId) {
    if (!idCheckList.includes(checkBoxId) && !$(this).prop("checked"))
    {
        idCheckList.push(checkBoxId);
        if ($('.checkbox:checked').length == $('.checkbox').length-1) {
            if (!$("#checkAll").prop("checked"))
                $("#checkAll").prop("checked",true);
        }
    }
    else {
        if ($("#checkAll").prop("checked"))
            $("#checkAll").prop("checked",false);
        idCheckList.splice(idCheckList.indexOf(checkBoxId), 1);
    }
    delstate();
    alert(idCheckList);
}
function delstate() {
    if (idCheckList.length > 0) {
        $("#buttonDelete").removeAttr('disabled');
    }
    else
    {
        $("#buttonDelete").attr('disabled','disabled');
    }
}