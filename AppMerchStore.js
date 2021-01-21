import React from 'react';
import './AppMerchStore.css';
import './CartCard.css';
import ProductCard from './ProductCard'
import SearchCard from './SearchCard'
import CartCard from './CartCard'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      activeProduct: {
        id: null,
        title: "",
        price: "",
        image: [],
        description: "",
      },
      searchList: [],
      activeSearch: "",
      editing: false,
      editing_plus_image: false,
      detail_view: false,
      showForm: false,
      formOpacity: false,
      adminMode: false,
      showCartForm: false,
      cartFormOpacity: false,
      cartTitle: "",
      cartPrice: "",
      cartAmount: 1,
      cart: [],
      cartTotal: 0,
      cartTotalAmount: 0,
      cartAdd: false,
      cartFull: false,
      showCart: false,
      cartOpacity: false,
    };
    this.getProduct = this.getProduct.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.productSubmit = this.productSubmit.bind(this);
    this.beginEdit = this.beginEdit.bind(this);
    this.detailView = this.detailView.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.backButtonDetail = this.backButtonDetail.bind(this);
    this.backButtonClick = this.backButtonClick.bind(this);
    this.detailDescription = this.detailDescription.bind(this);
    this.cartAmountChange = this.cartAmountChange.bind(this);
    this.cartSubmit = this.cartSubmit.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.creationFormStyle = this.creationFormStyle.bind(this);
    this.createFormOpacity = this.createFormOpacity.bind(this);
    this.buttonClickForm = this.buttonClickForm.bind(this);
    this.backButtonClickForm = this.backButtonClickForm.bind(this);
    this.backButtonAnim = this.backButtonAnim.bind(this);
    this.backButtonAnimReset = this.backButtonAnimReset.bind(this);
    this.toggleAdminMode = this.toggleAdminMode.bind(this);
    this.adminStyle = this.adminStyle.bind(this);
    this.buttonClickCartForm = this.buttonClickCartForm.bind(this);
    this.backButtonClickCartForm = this.backButtonClickCartForm.bind(this);
    this.backButtonCartAnim = this.backButtonCartAnim.bind(this);
    this.backButtonCartAnimReset = this.backButtonCartAnimReset.bind(this);
    this.buttonClickCart = this.buttonClickCart.bind(this);
    this.backButtonCartClick = this.backButtonCartClick.bind(this);
    this.backButtonCartOverlayAnim = this.backButtonCartOverlayAnim.bind(this);
    this.backButtonCartOverlayAnimReset = this.backButtonCartOverlayAnimReset.bind(this);
    this.backButtonCreateFormOverlayAnim = this.backButtonCreateFormOverlayAnim.bind(this);
    this.backButtonCreateFormOverlayAnimReset = this.backButtonCreateFormOverlayAnimReset.bind(this);
    this.fullCartMessage = this.fullCartMessage.bind(this);
    this.cartItemDelete = this.cartItemDelete.bind(this);
    this.detailBackIconRef = React.createRef();
    this.siteModeToggleButtonRef = React.createRef();
    this.cartQuantWrapperRef = React.createRef();
    this.detailCartBackIconRef = React.createRef();
    this.cartBackButtonRef = React.createRef();
    this.createFormBackIconRef = React.createRef();
  };
  getProduct(id, detail) {
    var url = "http://127.0.0.1:8000/MerchApi/product-list/"
    if (detail === true) {
      url = "http://127.0.0.1:8000/MerchApi/product-detail/" + id + "/";
      this.setState({
        detail_view: true,
      })
    }
    fetch(url).then((response) => response.json()).then((jsonData) => {
      if (Array.isArray(jsonData)) {
        this.setState({
          productList: jsonData
        })
      } else {
        let listData = []
        listData.push(jsonData)
        this.setState({
          productList: listData,
        })
      }
    });
    window.scrollTo(0, 0)
  };
  componentDidMount() {
    this.getProduct()
  }
  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  titleChange(e) {
    const newTitle = e.target.value;
    this.setState({
      activeProduct: {
        ...this.state.activeProduct,
        title: newTitle
      }
    });
  }
  priceChange(e) {
    const newPrice = e.target.value;
    this.setState({
      activeProduct: {
        ...this.state.activeProduct,
        price: newPrice
      }
    });
  }
  imageChange(e) {
    const newImgTemp = e.target.files[0];
    const newImage = [];
    newImage.push(newImgTemp)
    this.setState({
      activeProduct: {
        ...this.state.activeProduct,
        image: newImage
      },
      editing_plus_image: true,
    });
  }
  descriptionChange(e) {
    const newDescription = e.target.value;
    this.setState({
      activeProduct: {
        ...this.state.activeProduct,
        description: newDescription
      }
    });
  }
  searchSubmit(e) {
    e.preventDefault()
    if (this.state.activeSearch == "") {
      this.getProduct()
      this.backButtonClick()
    }
  }
  productSubmit(e) {
    e.preventDefault()
    let formData = new FormData();
    var url = "http://127.0.0.1:8000/MerchApi/product-create/"
    if (this.state.editing === true && this.state.editing_plus_image === false) {
      url = "http://127.0.0.1:8000/MerchApi/product-edit/" + this.state.activeProduct.id + "/";
      this.setState({
        editing: false,
        detail_view: false,
      });
    }
    if (this.state.editing === true && this.state.editing_plus_image === true) {
      url = "http://127.0.0.1:8000/MerchApi/product-plus-edit/" + this.state.activeProduct.id + "/";
      this.setState({
        editing: false,
        editing_plus_image: false,
        detail_view: false,
      });
    }
    formData.append('title', this.state.activeProduct.title)
    formData.append('price', this.state.activeProduct.price)
    if (this.state.editing_plus_image === true) {
      formData.append('image', this.state.activeProduct.image[0])
    }
    formData.append('description', this.state.activeProduct.description)
    var csrftoken = this.getCookie("csrftoken");
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken
      },
      body: formData
    }).then(() => {
      this.getProduct();
      this.setState({
        activeProduct: {
          id: null,
          title: "",
          price: "",
          image: [],
          description: "",
        },
        editing_plus_image: false,
        editing: false,
        showForm: false,
        formOpacity: false,
      });
    })
  }
  backButtonCreateFormOverlayAnim() {
    this.createFormBackIconRef.current.style.top = "-3px";
  }
  backButtonCreateFormOverlayAnimReset() {
    this.createFormBackIconRef.current.style.top = "1px";
  }
  searchChange(e) {
    const newSearch = e.target.value;
    this.setState({
      ...this.state,
      activeSearch: newSearch,
    });
    if (newSearch == "") {
      this.setState({
        searchList: []
      })
    } else if (newSearch != "") {
      fetch("http://127.0.0.1:8000/MerchApi/product-search/" + newSearch).then((response) => response.json()).then((jsonData) =>
        this.setState({
          searchList: jsonData
        }));
    }
  }
  beginEdit(product) {
    this.setState({
      activeProduct: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
      },
      editing: true,
    })
  }
  detailView(product) {
    let detail = true;
    this.getProduct(product.id, detail);
    this.setState({
      cartTitle: product.title,
      cartPrice: product.price,
    })
  }
  cartAmountChange(e) {
    const newAmount = e.target.value;
    this.setState({
      cartAmount: newAmount,
    })
  }
  cartSubmit(e) {
    e.preventDefault();
    const total = parseInt(this.state.cartAmount) * parseInt(this.state.cartPrice);
    const cartTotal = parseInt(this.state.cartTotal) + total;
    const cartTotalAmount = parseInt(this.state.cartAmount) + parseInt(this.state.cartTotalAmount);
    const name = this.state.cartTitle;
    let cart = [...this.state.cart];
    if (cart.length < 9) {
      cart.push({ total: total, name: name, multiplier: this.state.cartAmount });
      this.setState({
        cartAdd: true,
        cartFull: false,
        cartTotal: cartTotal,
        cartTotalAmount: cartTotalAmount
      })
    }
    else {
      this.setState({
        cartAdd: false,
        cartFull: true,
      })
      this.fullCartMessage()
    }
    this.setState({
      cartAmount: 1,
      cart: cart,
    })
  }
  backButtonDetail(view) {
    let style;
    if (view === false) {
      style = {
        display: "none"
      }
    }
    else {
      style = {
        display: "block"
      }
    }
    return style;
  }
  backButtonAnim() {
    this.detailBackIconRef.current.style.top = "-4px";
  }
  backButtonAnimReset() {
    this.detailBackIconRef.current.style.top = "1px";
  }
  detailDescription(product) {
    this.setState({
      activeProduct: {
        ...this.activeProduct,
        description: product.description,
      }
    })
  }
  backButtonClick() {
    this.getProduct()
    this.setState({
      activeProduct: {
        ...this.state.activeProduct,
        description: ""
      },
      detail_view: false,
      showCartForm: false,
      cartFormOpacity: false,
      cartTitle: "",
      cartPrice: "",
      cartAmount: 1,
    })
  }
  creationFormStyle(show) {
    let style;
    if (show === false) {
      style = {
        display: "none",
      }
    }
    else {
      style = {
        display: "block",
      }
    }
    return style;
  }
  createFormOpacity(opacity) {
    let style;
    if (opacity === false) {
      style = {
        opacity: "0%"
      }
    }
    else {
      style = {
        opacity: "100%"
      }
    }
    return style;
  }
  buttonClickForm() {
    this.setState({
      showForm: true,
    })
    let self = this
    setTimeout(() => self.setState({
      formOpacity: true
    }), 1500)
  }
  backButtonClickForm() {
    this.setState({
      activeProduct: {
        id: null,
        title: "",
        price: "",
        image: [],
        description: this.state.activeProduct.description,
      },
      editing: false,
      showForm: false,
      formOpacity: false,
    })
    let self = this
    setTimeout(() => self.setState({
      formOpacity: false
    }), 1550)
  }
  adminStyle(show) {
    let styleAdmin
    if (show === false) {
      styleAdmin = {
        display: "none"
      }
    } else {
      styleAdmin = {
        display: "block"
      }
    }
    return styleAdmin;
  }
  toggleAdminMode() {
    if (this.state.adminMode === false) {
      this.siteModeToggleButtonRef.current.style.right = "105px"
      this.setState({
        adminMode: true
      })
    } else {
      this.siteModeToggleButtonRef.current.style.right = "5px"
      this.setState({
        adminMode: false
      })
    }
  }
  buttonClickCartForm() {
    this.setState({
      showCartForm: true,
    })
    let self = this
    setTimeout(() => self.setState({
      cartFormOpacity: true
    }), 800)
  }
  backButtonClickCartForm() {
    this.setState({
      showCartForm: false,
      cartFormOpacity: false,
      cartAmount: 1,
    })
    let self = this
    setTimeout(() => self.setState({
      cartFormOpacity: false
    }), 850)
  }
  backButtonCartAnim() {
    this.detailCartBackIconRef.current.style.top = "-3px";
  }
  backButtonCartAnimReset() {
    this.detailCartBackIconRef.current.style.top = "1px";
  }
  buttonClickCart() {
    this.setState({
      showCart: true,
    })
    let self = this
    setTimeout(() => self.setState({
      cartOpacity: true
    }), 1500)
  }
  backButtonCartClick() {
    this.setState({
      showCart: false,
      cartOpacity: false
    })
    let self = this
    setTimeout(() => self.setState({
      cartOpacity: false
    }), 1550)
  }
  backButtonCartOverlayAnim() {
    this.cartBackButtonRef.current.style.top = "-3px";
  }
  backButtonCartOverlayAnimReset() {
    this.cartBackButtonRef.current.style.top = "1px";
  }
  addedToCartStyle(bool) {
    let style;
    if (bool) {
      style = {
        display: "block"
      }
    } else {
      style = {
        display: "none"
      }
    }
    return style;
  }
  fullCartMessage(bool) {
    let style;
    if (bool) {
      style = {
        display: "block"
      }
    } else {
      style = {
        display: "none"
      }
    }
    return style;
  }
  cartItemDelete(index) {
    let newTotalAmount = parseInt(this.state.cartTotalAmount) - parseInt(this.state.cart[index].multiplier)
    let newTotal = parseInt(this.state.cartTotal) - parseInt(this.state.cart[index].total)
    this.setState({
      cartTotal: newTotal,
      cartTotalAmount: newTotalAmount
    })
    this.state.cart.splice(parseInt(index), 1)
    this.buttonClickCart()
  }
  render() {
    const self = this;
    if (this.state.editing) {
      var submitType = "Edit"
    }
    else {
      var submitType = "Create"
    }
    const addedToCartStyle = this.addedToCartStyle(this.state.cartAdd);
    const cartFullRefStyle = this.fullCartMessage(this.state.cartFull);
    const styleAdmin = this.adminStyle(this.state.adminMode);
    const cartOpacity = this.createFormOpacity(this.state.cartOpacity);
    const cartDisplay = this.creationFormStyle(this.state.showCart);
    const cartFormOpacity = this.createFormOpacity(this.state.cartFormOpacity);
    const cartFormDisplay = this.creationFormStyle(this.state.showCartForm);
    const creatFormOpacity = this.createFormOpacity(this.state.formOpacity);
    const createFormStyle = this.creationFormStyle(this.state.showForm);
    const backButtonDetail = this.backButtonDetail(this.state.detail_view);
    const searchesMapped = this.state.searchList.map((item) => <SearchCard data={item} id={item.id} detailView={this.detailView} detailDescription={this.detailDescription} />);
    const productsMapped = this.state.productList.map((item) => <ProductCard data={item} id={item.id} beginEdit={this.beginEdit} detailView={this.detailView} detailDescription={this.detailDescription} editForm={this.buttonClickForm} getProduct={this.getProduct} adminMode={this.state.adminMode} />);
    const cartCardsMapped = this.state.cart.map((item, index) => <CartCard data={item} id={index} cartItemDelete={this.cartItemDelete} />)
    return (
      <div className="MainWrapper">
        <div className="CreateFormWrapper" style={createFormStyle}>
          <div className="CreateFormBackButton" onClick={() => self.backButtonClickForm()} onMouseOver={() => self.backButtonCreateFormOverlayAnim()} onMouseOut={() => self.backButtonCreateFormOverlayAnimReset()}><div className="GeneralBackButtonIconDiv" ref={this.createFormBackIconRef}><i className="fas fa-sort-up fa-3x DetailBackButtonIcon"></i></div></div>
          <div className="CreateForm" style={creatFormOpacity}>
            <form onSubmit={this.productSubmit}>
              <div className="TitleInputWrapper">
                <input
                  type="text"
                  className="TitleInput"
                  value={this.state.activeProduct.title}
                  name="title"
                  placeholder="title"
                  maxLength="20"
                  onChange={this.titleChange} required
                />
              </div>
              <div className="PriceInputWrapper">
                <input
                  type="text"
                  className="PriceInput"
                  value={this.state.activeProduct.price}
                  name="price"
                  placeholder="price"
                  maxLength="4"
                  onChange={this.priceChange} required
                />
              </div>
              <div className="ImageInputWrapper">
                <input
                  type="file"
                  className="ImageInput"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={this.imageChange}
                />
              </div>
              <div className="DescriptionInputWrapper">
                <textarea
                  className="DescriptionInput"
                  value={this.state.activeProduct.description}
                  name="description"
                  placeholder="description"
                  maxLength="300"
                  onChange={this.descriptionChange} />
              </div>
              <div className="SubmitInputWrapper"><input className="SubmitInput" type="Submit" value={submitType} /></div>
            </form>
          </div>
        </div>
        <div className="CartWrapper" style={cartDisplay}>
          <div className="CartBackButton" onClick={() => self.backButtonCartClick()} onMouseOver={() => self.backButtonCartOverlayAnim()} onMouseOut={() => self.backButtonCartOverlayAnimReset()}><div className="GeneralBackButtonIconDiv" ref={this.cartBackButtonRef}><i className="fas fa-sort-up fa-3x DetailBackButtonIcon"></i></div></div>
          <div style={cartOpacity} className="Cart">
            {cartCardsMapped}
            <hr style={{ borderStyle: "none", borderBottom: "1px solid rgba(12, 255, 85, .4)", width: "80%" }}></hr>
            <div className="CartTotalMainWrapper">
              <div className="CartCardWrapper">
                <div className="CartCardNameWrapper">
                  <div className="CartCardName">
                    Total
                </div>
                </div>
                <div className="CartCardAmountWrapper" >
                  <div className="CartCardAmount">
                    x {this.state.cartTotalAmount}
                  </div>
                </div>
                <div className="CartCardTotalWrapper">
                  <div className="CartCardTotal">
                    ${this.state.cartTotal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="FullCartMessageWrapper" style={cartFullRefStyle} onClick={() => {
          self.setState({
            cartFull: false
          })
        }}><div className="FullCartMessage">Your Cart Is Full</div></div>
        <div className="AddToCartMessageWrapper" style={addedToCartStyle} onClick={() => {
          self.setState({
            cartAdd: false
          })
        }}><div className="AddToCartMessage">Item Added to Cart</div></div>
        <div className="SiteHeaderWrapper">
          <div className="SearchFormWrapper">
            <form onSubmit={this.searchSubmit}>
              <input
                type="text"
                className="SearchInput"
                value={this.state.activeSearch}
                name="search"
                placeholder="Search"
                maxLength="20"
                onChange={this.searchChange}
              />
            </form>
            <div className="SearchesWrapper">
              {searchesMapped}
            </div>
            <div className="CartButton" onClick={() => self.buttonClickCart()}><div className="CartIconWrapper"><i class="fas fa-cart-arrow-down fa-2x CartIcon"></i></div></div>
          </div>
          <div className="CreateProductButton" style={styleAdmin} onClick={() => {
            self.buttonClickForm(); self.setState({
              activeProduct: {
                id: null,
                title: "",
                price: "",
                image: [],
                description: ""
              },
              detail_view: false,
              showCartForm: false,
              cartFormOpacity: false,
              cartTitle: "",
              cartPrice: "",
              cartAmount: 1,
            }); if (this.state.detail_view) {
              self.getProduct()
            }
          }}>
            <i className="fas fa-plus fa-2x CreateProductButtonIcon"></i>
            <div className="CreateProductButtonName">create</div>
          </div>
        </div>
        <div className="SiteModeToggleWrapper">
          <div className="SiteModeToggleButton" onClick={() => self.toggleAdminMode()}>
            <div className="AdminAnUserCard" ref={this.siteModeToggleButtonRef} onMouseDown={() => { this.siteModeToggleButtonRef.current.style.backgroundColor = "rgb(10, 20, 10)" }} onMouseUp={() => { this.siteModeToggleButtonRef.current.style.backgroundColor = "rgb(10, 10, 10)" }} onMouseOut={() => { this.siteModeToggleButtonRef.current.style.backgroundColor = "rgb(10, 10, 10)" }}>
              <div className="AdminCard">Admin</div>
              <div className="UserCard">User</div>
            </div>
          </div>
        </div>
        <div className="MainProductCardWrapper">
          <div className="DetailBackButton" style={backButtonDetail} onClick={() => self.backButtonClick()} onMouseOver={() => self.backButtonAnim()} onMouseOut={() => self.backButtonAnimReset()}>
            <div className="GeneralBackButtonIconDiv" ref={this.detailBackIconRef}><i className="fas fa-sort-up fa-3x DetailBackButtonIcon"></i></div>
          </div>
          <div className="ProductCardsWrapper">
            {productsMapped}
            <div style={backButtonDetail} className="DetailCard">
              <div className="DetailDescription">{this.state.activeProduct.description}</div>
              <div className="DetailCartButton">
                <div onClick={() => self.buttonClickCartForm()} className="DetailCartText">Add to Cart</div>
                <div className="DetailCartQuantity" ref={this.cartQuantWrapperRef} style={cartFormDisplay}>
                  <div class="DetailCartBackButton" onClick={() => self.backButtonClickCartForm()} onMouseOver={() => self.backButtonCartAnim()} onMouseOut={() => self.backButtonCartAnimReset()}><div className="DetailCartBackButtonIconDiv" ref={this.detailCartBackIconRef}><i className="fas fa-sort-up fa-2x DetailBackButtonIcon"></i></div></div>
                  <form onSubmit={this.cartSubmit} className="DetailCartForm" style={cartFormOpacity}>
                    <div className="DetailCartQuantitySelection">
                      <select value={this.state.cartAmount} onChange={this.cartAmountChange} name="amount" className="DetailCartQuantitySelect">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div className="DetailCartSubmitWrapper"><input type="Submit" value="Add" className="DetailCartSubmit" /></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="FooterWrapper"></div>
      </div>
    )
  };
};
