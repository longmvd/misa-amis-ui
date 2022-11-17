<template>
  <div class="sidebar" ref="sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__logo">
        <button class="btn btn--square logo-button bg-none" id="btn-grid">
          <i class="icon-24 icon-grid"></i>
        </button>
        <button class="btn btn--square logo-button bg-none" id="btn-bar--white">
          <i class="icon-24 icon-bar--white"></i>
        </button>
        <div class="logo"></div>
      </div>
      <div class="scroller s sidebar-list-wrapper">
        <div class="sidebar__list">
          <div class="sidebar__item have-tooltip" tooltip="Tổng quan">
            <div class="item__icon">
              <i class="icon-24 icon-overview"></i>
            </div>
            <div class="item__title">Tổng quan</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Tiền mặt">
            <div class="item__icon">
              <i class="icon-24 icon-money"></i>
            </div>
            <div class="item__title">Tiền mặt</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Tiền gửi">
            <div class="item__icon">
              <i class="icon-24 icon-bank"></i>
            </div>
            <div class="item__title">Tiền gửi</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Mua hàng">
            <div class="item__icon">
              <i class="icon-24 icon-bag"></i>
            </div>
            <div class="item__title">Mua hàng</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Bán hàng">
            <div class="item__icon">
              <i class="icon-24 icon-cart"></i>
            </div>
            <div class="item__title">Bán hàng</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Quản lý hóa đơn">
            <div class="item__icon">
              <i class="icon-24 icon-invoice"></i>
            </div>
            <div class="item__title">Quản lý hóa đơn</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Kho">
            <div class="item__icon">
              <i class="icon-24 icon-stock"></i>
            </div>
            <div class="item__title">Kho</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Công cụ dụng cụ">
            <div class="item__icon">
              <i class="icon-24 icon-tools"></i>
            </div>
            <div class="item__title">Công cụ dụng cụ</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Tài sản cố định">
            <div class="item__icon">
              <i class="icon-24 icon-assets"></i>
            </div>
            <div class="item__title">Tài sản cố định</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Tiền lương">
            <div class="item__icon">
              <i class="icon-24 icon-salary"></i>
            </div>
            <div class="item__title">Tiền lương</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Thuế">
            <div class="item__icon">
              <i class="icon-24 icon-tax"></i>
            </div>
            <div class="item__title">Thuế</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Giá thành">
            <div class="item__icon">
              <i class="icon-24 icon-price"></i>
            </div>
            <div class="item__title">Giá thành</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Tổng hợp">
            <div class="item__icon">
              <i class="icon-24 icon-general"></i>
            </div>
            <div class="item__title">Tổng hợp</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Ngân sách">
            <div class="item__icon">
              <i class="icon-24 icon-budget"></i>
            </div>
            <div class="item__title">Ngân sách</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Báo cáo">
            <div class="item__icon">
              <i class="icon-24 icon-report"></i>
            </div>
            <div class="item__title">Báo cáo</div>
          </div>
          <div class="sidebar__item have-tooltip" tooltip="Phân tích tài chính">
            <div class="item__icon">
              <i class="icon-24 icon-finance"></i>
            </div>
            <div class="item__title">Phân tích tài chính</div>
          </div>
        </div>
      </div>
      <!-- <div class="sidebar__item have-tooltip sidebar__footer">
                    <div class="item__icon">
                        <i class="fa-solid fa-angle-left"></i>
                    </div>
                    <div class="item__title">
                        Thu gọn
                    </div>
                </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "AmisSidebar",
};
</script>
<style>
.sidebar {
  position: relative;
  background-color: var(--side-bar--bgcolor);
  width: var(--side-bar-width);
  color: #869ab8;
  display: flex;
  flex-direction: column;
}
.sidebar__logo {
  position: fixed;
  display: flex;
  width: 200px;
  height: var(--header-height);
  align-items: center;
  background-color: var(--side-bar--bgcolor);
}

.sidebar-list-wrapper {
  overflow: auto;
  height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
}
.sidebar__list {
  flex: 1;
  margin: 0 12px;
}
.sidebar__item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  height: 44px;
  border-radius: 4px;
  cursor: pointer;
}
.item__icon {
  margin: 0 12px;
  font-size: 24px;
}

/* side bar thu gọn */
.sidebar.mini {
  width: auto;
}
.sidebar.mini .item__title {
  display: none;
}
.sidebar.mini .logo {
  display: none;
}
.sidebar.mini #btn-grid {
  display: none;
}

.sidebar.mini #btn-bar--black {
  display: none;
}

.sidebar.mini #btn-bar--white {
  display: block;
}

#btn-bar--white {
  display: none;
}
/* /////////// */
.sidebar__item:hover {
  /* position: relative; */
  color: #fff;
  background-color: #27395e;
}

/* .sidebar__item::before{
    position: absolute;
    content:"";
    opacity: 0;
}
.sidebar__item:hover::before{
    content: "công cụ hỗ trợ vay vốn";
    opacity: 1;
    bottom: 0;
    background-color: #000;
    right: 0;
} */

.sidebar__footer {
  border-top: 1px solid;
  border-radius: unset;
  /* position: absolute;
    bottom: 0;
    right: 0;
    left:0; */
  background-color: var(--side-bar--bgcolor);
}

.sidebar__footer .item__icon {
  margin: 0 16px 0 24px;
}

.sidebar__wrapper {
  height: 100vh;
  overflow: auto;
}

/* .sidebar::-webkit-scrollbar{
    visibility: hidden;
    width: 2px;
    color:red;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
} */
</style>
