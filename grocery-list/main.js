function Item(name, type, price) {
  this.name = name;
  this.type = type;
  this.price = price;
}
Item.prototype.toString = function() {
  return this.name + ': $' + this.price;
}

function List() {
  this.contents = [];
  for (item in arguments) {
    this.contents.push(arguments[item]);
  };
}
List.prototype.add = function() {
  for (item in arguments) {
    this.contents.push(arguments[item]);
  };
}
List.prototype.remove = function(item) {
  var ind = this.contents.indexOf(item)
  this.contents.splice(ind, 1)
}
List.prototype.totalCost = function() {
  return this.contents.map(function(item) {return +item.price}).reduce(function(a, b) {return a + b}, 0);
}
List.prototype.sortPrice = function() {
  this.contents.sort(function(a, b) {return b.price - a.price});
  return this;
}
List.prototype.sortType = function() {
  this.contents.sort(function(a, b) {return b.type < a.type});
  return this;
}

var milk = new Item('milk', 'dairy', 3.00)
var oranges = new Item('oranges', 'fruit', 2.50)
var avocados = new Item('avocados', 'fruit', 5.50)
var steak = new Item('steak', 'meat', 10.00)

var test = new List(milk, oranges, steak)
test.add(milk, avocados)

test.remove(milk);
console.log(test.contents);
console.log(test.totalCost());
test.sortType();
console.log(test.contents);




var ListHeader = React.createClass({
  render: function() {
    return (
      <thead>
        <tr className="stuff">
          <th> Item ({this.props.list.contents.length} total)</th>
          <th> Type </th>
          <th> Price (${this.props.list.totalCost()}) </th>
        </tr>
      </thead>
    );
  }
});

var ListBody = React.createClass({
  render: function() {
    var tableNodes = this.props.list.contents.map(function (item) {
      var thisPrice = parseFloat(Math.round(item.price * 100) / 100).toFixed(2);
      return (
        <tr className="stuff">
          <td> {item.name} </td>
          <td> {item.type} </td>
          <td> ${thisPrice} </td>
        </tr>
      );
    });
    return (
      <tbody>
        {tableNodes}
      </tbody>
    );
  }
});

var ListWindow = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  sortPrice: function(event) {
    var newData = this.props.data.sortPrice();
    this.setState({data: newData});
  },
  sortType: function(event) {
    var newData = this.props.data.sortType();
    this.setState({data: newData});
  },
  clearList: function(event) {
    this.props.data = new List();
    this.setState({data: this.props.data});
  },
  addItem: function (event) {
    event.preventDefault();
    var itemName = this.refs.name.getDOMNode().value.trim();
    var itemType = this.refs.type.getDOMNode().value.trim();
    var itemPrice = this.refs.price.getDOMNode().value.trim();
    if (isNaN(+itemPrice)) {
      alert('Price must be a number.');
      return;
    }
    if (!itemName) {
      alert('Item must have a name.');
      return;
    }
    var newItem = new Item(itemName, itemType, itemPrice);
    this.props.data.contents.push(newItem);
    this.setState({data: this.props.data});
    this.refs.name.getDOMNode().value = '';
    this.refs.type.getDOMNode().value = '';
    this.refs.price.getDOMNode().value = '';
  },
  render: function() {
    var deleteNodes = this.props.list.contents.map(function (_, i) {
      return (
        <tr className="stuff">
          <td>  </td>
        </tr>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
            <table className="table table-hover">
              <ListHeader list={this.state.data} />
              <ListBody list={this.state.data} />
            </table>
            <table>

            </table>
          </div>
        </div>
        <button onClick={this.sortPrice} className="btn btn-default"> Sort Price </button>
        <button onClick={this.sortType} className="btn btn-default"> Sort Type </button>
        <button onClick={this.clearList} className="btn btn-danger"> Clear List </button>

        <h3>Add Items</h3>
        <form className="form-inline" onSubmit={this.addItem}>
          <div className="form-group">
            <input type="text" className="form-control" ref="name" placeholder="item name" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref="type" placeholder="type" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref="price" placeholder="price" />
          </div>
          <button type="submit" className="btn btn-primary"> Submit </button>
        </form>
      </div>
    );
  }
});

React.render(
  <ListWindow data={test} />,
  document.getElementById('content')
);
