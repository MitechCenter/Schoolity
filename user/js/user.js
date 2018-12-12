var ShoolityApp = angular.module('ShoolityApp', []);

var dsLinkMenu = {
  "root": "user/menu/hocsinh/",
  "child": [
    "-- HOC SINH --",
    "hosohocsinh/banghosohocsinh.html",
    "sodiem/sodiem.html",
    "diemdanh/diemdanh.html",
    "vipham/vipham.html",
    "-- TONG KET DIEM --",
    "-- tong ket diem --",
    "-- tong ket diem, xep loai theo khoi --",
    "-- diem thi hoc ky --",
    "xeploaihanhkiem/xeploaihanhkiem.html",
    "xeploaihocluc/xeploaihocluc.html",
    "--qlthongtintotnghiep--",
    "xeploaithidua/xeploaithidua.html",
    "-- QUAN LY THI LAI --",
    "quanlythilai/dangkymonthilai.html",
    "quanlythilai/capnhatdiemthilai.html",
    "quanlythilai/xulyketquathilai.html"
  ]
};
ShoolityApp.controller('ShoolityCtrl', function ($scope, $http) {
  $(function () {
    // Hiển thị hộp thoại tìm kiếm nâng cao khi được nhấn
    $(document).ready(function () {
      $("#cancelBtn").click(function () {
        $('#showAdvanceSearch').click();
      });
      $("#searchBtn").click(function () {
        let sendJS = {};
        sendJS["ipTrg"] = $("#ipTrg").val();
        sendJS["ipLp"] = $("#ipLp").val();
        sendJS["ipTen"] = $("#ipTen").val();
        sendJS["ipMSV"] = $("#ipMSV").val();
        sendJS["ipNS"] = $("#ipNS").val();
        alert("Gửi thông tin yêu cầu tìm theo chuỗi sau: \n" + JSON.stringify(sendJS));
      });
    });
    // Tải danh mục menu bên trái của trang
    $http.get("user/json/menu.json")
      .then(function (response) {
        $scope.LeftMenu = response.data;
      });
    // Danh sách các trang được nhúng vào bằng ng-include
    $scope.leftMenuURL = "user/menu/menu.html";
    $scope.AddNewDialog = "user/modal/add.html";
    $scope.EditDialog = "user/modal/edit.html";
    $scope.ConfirmDialog = "user/modal/confirm.html";
    $scope.ViewDialog = "user/modal/view.html";
    $scope.HeaderBar = "user/modal/header.html";
    $scope.AsideMenu = "user/modal/aside-menu.html";
    $scope.Footer = "user/modal/footer.html";
    $scope.AdvanceSearchDialog = "user/modal/advanceSearch.html";

    // Danh sách trang được nhúng vào trang hồ sơ học sinh
    $scope.ShowFullStudentDetail = "user/menu/hocsinh/hosohocsinh/view/hienthithongtinchitiet.html"
    $scope.TabLayout = ["user/menu/hocsinh/hosohocsinh/view/tab-chitiethocsinh.html",
      "user/menu/hocsinh/hosohocsinh/view/tab-ketquakhamskdinhky.html",
      "user/menu/hocsinh/hosohocsinh/view/tab-khenthuongkyluat.html",
      "user/menu/hocsinh/hosohocsinh/view/tab-quatrinhhoctap.html",
      "user/menu/hocsinh/hosohocsinh/view/tab-viphammiengiam.html"
    ];
    $scope.CacLoaiHoSo = ["banghosohocsinh.html", "banghosomiengiam.html",
      "banghosocabiet.html", "banghosokhenthuong.html",
      "banghosokyluat.html", "banghosobaoluu.html"
    ];
    $(document).ready(function () {
      $(window).click(function (e) {
        if (e.target.id === "xem_ho_so") {
          $scope.loadToDetail(0);
        }
      });
    });
    $scope.loadToDetail = function (position) {
      $http.get($scope.TabLayout[position])
        .then(function (response) {
          $("#nav-tabContent").html(response.data);
        });
    }
    $scope.miniMenu = function (position) {
      let pathForward = "user/menu/hocsinh/hosohocsinh/" + $scope.CacLoaiHoSo[position];
      $http.get(pathForward)
        .then(function (response) {
          $scope.CurrentActivity = pathForward;
        }, function osErr(response) {
          $.toaster({
            priority: 'danger',
            title: 'Chưa hoàn thành!',
            message: 'Dữ liệu của bạn chưa thể hiển thị ngay bây giờ!'
          });
          $("#RunningProgress").addClass("fade");
        });
    }
    let showID = 1;
    $scope.CurrentActivity = getPath(showID); // set for start up
    renewEvent();
    $scope.$on('CurrentActivity', function (event, CurrentActivity) {
      if (CurrentActivity.id == showID)
        return;
      $http.get(getPath(CurrentActivity.id))
        .then(function (response) {
          showID = CurrentActivity.id;
          $("#RunningProgress").removeClass("fade");
          $scope.CurrentActivity = getPath(CurrentActivity.id);
          $("#function-path").html(CurrentActivity.path);
          renewEvent();
        }, function osErr(response) {
          $.toaster({
            priority: 'danger',
            title: 'Chưa hoàn thành!',
            message: 'Dữ liệu của bạn chưa thể hiển thị ngay bây giờ!'
          });
          $("#RunningProgress").addClass("fade");
        });
    });
  });

  function renewEvent() {
    // function for reload event set after dom data
    $scope.showSearch = function () {
      if (visibleAdvanceSearch == false) {
        visibleAdvanceSearch = true;
        $('#formAdvanceSearch').removeClass('fade-out');
        $('#formAdvanceSearch').addClass('fade-in');
        $('#showAdvanceSearch i').removeClass('fa-chevron-circle-down');
        $('#showAdvanceSearch i').addClass('fa-chevron-circle-up');
      } else {
        visibleAdvanceSearch = false;
        $('#formAdvanceSearch').removeClass('fade-in');
        $('#formAdvanceSearch').addClass('fade-out');
        $('#showAdvanceSearch i').removeClass('fa-chevron-circle-up');
        $('#showAdvanceSearch i').addClass('fa-chevron-circle-down');
      }
    }
  }
  // Hàm dùng để lấy đường dẫn khi nhấn vào item có vị trí --index-- trong menu
  function getPath(index) {
    return dsLinkMenu.root + dsLinkMenu.child[index];
  }


  $scope.catchID = function ($mHS) {
    alert($mHS);
  }

  /* Các hàm thực hiện lấy nội dung */

  // ------------------------ BANG HO SO HOC SINH -------------------------------//
  // Thực hiện lấy nôi dung của header trong bảng hồ sơ học sinh
  $http.get("user/json/header.json")
    .then(function (response) {
      $scope.header = response.data;
    });

  // Thực hiện lấy dánh cách các dòng trong bảng hồ sơ học sinh
  $http.get("user/json/danhsach.json")
    .then(function (response) {
      var data;
      data = response.data;

      $scope.danhsach = data.danhsach;
    });

  // Thực hiện lấy nội dung trong file json để đổ vào box khi nhấn nút sửa
  $http.get("user/json/sua.json")
    .then(function (response) {
      var data;
      data = response.data;

      $scope.row = data;
    });
  // ------------------------ KET THUC BANG HO SO HOC SINH -------------------------------//

  // ------------------------ QUAN LÝ THI LẠI ------------------------------------//
  // Tải header của table Đăng ký thi lại
  $http.get("user/json/quanlythilai/headerDangkithilai.json")
    .then(function (response) {
      $scope.thilai = response.data;
    });

  // Tải danh sách học sinh đăng ký môn thi lại
  $http.get("user/json/quanlythilai/dkymonthilai.json")
    .then(function (response) {
      var data;
      data = response.data;

      $scope.monthilai = data.thilai;
    });

  // Cái gì đó ?
  $scope.isHideInRow = function (id) {
    let notArr = ['0x01', '0x02', '0x03'];
    return notArr.includes(id);
  }

  // Tải header của bảng Xư lý kết quả
  $http.get("user/json/quanlythilai/headerXulyketqua.json")
    .then(function (response) {
      $scope.tieude = response.data;
    });

  // Tải dữ liệu của kết quả thi lai lớp 10
  $http.get("user/json/quanlythilai/kqthilailop10.json")
    .then(function (response) {
      $scope.diem = response.data.kqthilai10;
    });

  // Tải xếp loại hạnh kiểm sau khi thi lại
  $http.get("user/json/quanlythilai/headerXuliketquathilai.json")
    .then(function (response) {
      $scope.xeploaithilai = response.data;
    });

  // Xếp loại học sinh thi lại
  $http.get("user/json/quanlythilai/xeploaihsthilai.json")
    .then(function (response) {
      $scope.kqxl = response.data.kqxeploaithilai;
    });

  // get TKD
  $http.get("user/json/quanlythilai/headerTKD.json")
    .then(function (response) {
      $scope.tkd = response.data;
    });

  $http.get("user/json/quanlythilai/tkhkII10a1.json")
    .then(function (response) {
      $scope.TKD = response.data.TK;
    });

  // get xep loai

  $http.get("user/json/quanlythilai/headerXeploai.json")
    .then(function (response) {
      $scope.xeploai = response.data;
    });


  $http.get("user/json/quanlythilai/xeploai.json")
    .then(function (response) {
      $scope.kqXeploai = response.data.xeploai;
    });

  // end

  // header Diem Thi Hoc ki

  $http.get("user/json/quanlythilai/headerDiemthihocki.json")
    .then(function (response) {
      $scope.diemthiHK = response.data;

    });

  $http.get("user/json/quanlythilai/v1.json")
    .then(function (response) {
      $scope.v1 = response.data.v1;
    });
  // ------------------------ KẾT THÚC CỦA QUẢN LÝ THI LẠI -----------------------//

  //------------------------- DiA DIEM -----------------------------------------//
  // Tải danh sách tất cả các tỉnh
  $http.get("user/json/tinhthanh.json")
    .then(function (response) {
      var data;
      data = response.data;

      $scope.tinhthanh = data.tinhthanh;
    });
  
  // Tải danh sách tất cả các quận huyện
    $http.get("user/json/quanhuyen.json")
    .then(function (response) {
      var data;
      data = response.data;

      $scope.quanhuyen = data.quanhuyen;
    });
    // Tải danh sách tất cả các xã phường
    $http.get("user/json/xaphuong.json")
    .then(function (response) {
      var data;
      data = response.data;
      $scope.xaphuong = data;
      ////analytics(data,"xaphuong",100);
    });
    // ------------------ XỬ LÝ ĐỊA ĐIỂM --------------------------------------//
    $scope.selectTinh = function () {
      if ($scope.tinh)
        $("#huyen").removeAttr("disabled");
      else {
        $("#huyen").attr("disabled", "");
        $("#phuongxa").attr("disabled", "");
      }
    }
    $scope.selectHuyen = function () {
      if ($scope.huyen)
        $("#xaphuong").removeAttr("disabled");
      else {
        $("#xaphuong").attr("disabled", "");
      }
    }
    $scope.selectPhuongXa = function () {
      if ($scope.xaphuong) {
        alert("Bạn ở [" + $scope.xaPhuong.ten + " - " + $scope.huyen.ten + " - " + $scope.tinh.ten + "] Với mã lần lượt là [" +
          $scope.xaPhuong.id + " - " + $scope.huyen.id + " - " + $scope.tinh.id + "]");
      }
    }
    //-------------------- KET THUC ĐỊA ĐIỂM ----------------------------------------//




    
});
ShoolityApp.run(function ($rootScope) {
  $rootScope.$on("$includeContentLoaded", function (event, templateName) {
    if (dsLinkMenu.child.indexOf(templateName.replace(new RegExp(dsLinkMenu.root, "g"), "")) != -1) {
      if (!$("#RunningProgress").hasClass('fade')) {
        $("#RunningProgress").addClass('fade');
        $.toaster({
          priority: 'success',
          title: 'Hoàn tất!',
          message: 'Dữ liệu của bạn đang được hiển thị.'
        });
        /////// RELOAD JS
        // $(function(){
        //   document.getElementById("dcmm").onclick = function () {
        //     alert(1);
        //   }
        //   $(document).ready(function(){
        //     $("#dcmm").click(function () {
        //       if (visibleAdvanceSearch == false) {
        //           visibleAdvanceSearch = true;
        //           $('#formAdvanceSearch').removeClass('fade-out');
        //           $('#formAdvanceSearch').addClass('fade-in');
        //           $('#showAdvanceSearch i').removeClass('fa-chevron-circle-down');
        //           $('#showAdvanceSearch i').addClass('fa-chevron-circle-up');
        //       } else {
        //           visibleAdvanceSearch = false;
        //           $('#formAdvanceSearch').removeClass('fade-in');
        //           $('#formAdvanceSearch').addClass('fade-out');
        //           $('#showAdvanceSearch i').removeClass('fa-chevron-circle-up');
        //           $('#showAdvanceSearch i').addClass('fa-chevron-circle-down');
        //       }
        //    });

        //   });
        // }())
      }
    }
  });
});