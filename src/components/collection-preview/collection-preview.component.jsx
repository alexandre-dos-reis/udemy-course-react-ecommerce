import React from "react";

import CollectionItem from "../collection-item/collection-item.component";
import { createStructuredSelector } from "reselect";
import { selectCollections } from '../../redux/shop/shop.selectors'
import { connect } from "react-redux";

import "./collection-preview.style.scss";

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})

export default connect(mapStateToProps)(CollectionPreview);
