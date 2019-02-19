import * as React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import MENU_LISTS, { MENU_LISTS_TOTAL } from './Menu'


class Silder extends React.Component {
  render() {
    return (
      <div className="silder">
        <div className="info">
          <div>总计：{MENU_LISTS_TOTAL}</div>
          <div>已完成18</div>
          <div>*进行中3</div>
        </div>
        <ul>
          {MENU_LISTS.map(list => {
            return (
              <li key={list.type} className="type">
                <div className="name">{list.type} {list.lists.length}</div>
                <ul>
                  {list.lists.map(menu => {
                    return (
                      <li key={menu.key} className="item">
                        <Link to={`/components/${menu.key}`}>{menu.name}</Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}
export default Silder;
