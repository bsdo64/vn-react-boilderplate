import React, { Component } from 'react';

import style from './index.css';

class Layout extends Component {

  render() {
    return (
      <div className={style.appRoot}>
        <header className={style.headerLayout}>
          <div className={style.header}>
            <div className={style.logoBox}>
              <div className={style.logo}>
                <a href="http://venacle.com">Venacle1</a>
              </div>

              <div className={style.logoLine}>|</div>

              <div className={style.logoDoc}>
                <a href="/">Doc</a>
              </div>
            </div>

            <div className={style.navi}>
              <div className={style.naviLink}>컨셉</div>
              <div className={style.naviLink}>가이드</div>
              <div className={style.naviLink}>문서</div>
              <div className={style.naviLink}>검색</div>
            </div>
          </div>
        </header>

        <div className={style.container}>
          <div className={style.content}>content</div>

          <div className={style.right}>right side menu</div>
        </div>

        <div className={style.footer}>
          <div>footer</div>
        </div>

      </div>
    );
  }
}

export default Layout;