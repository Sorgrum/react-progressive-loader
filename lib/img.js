"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropsTypes = require("prop-types");
var react_deco_1 = require("react-deco");
var observer_1 = require("./observer");
// https://jmperezperez.com/medium-image-progressive-loading-placeholder/
// https://code.fb.com/android/the-technology-behind-preview-photos/
// https://medium.com/front-end-hacking/progressive-image-loading-and-intersectionobserver-d0359b5d90cd
var imgStyle = {
    position: 'absolute',
    opacity: 0,
    top: '0',
    left: '0',
    width: '100%',
    height: 'auto',
    transition: 'opacity 1s linear'
};
var imgPlaceholderStyle = function (blurAmount) {
    return __assign({}, imgStyle, { filter: "blur(" + blurAmount + ")", transform: 'scale(1)' });
};
var wrapperStyle = {
    position: 'relative',
    overflow: 'hidden'
};
var backgroundStyle = __assign({}, imgStyle, { height: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' });
var defaultBgColor = '#f6f6f6';
var defaultBlurAmount = '50px';
function Img(props) {
    var src = props.src, placeholderSrc = props.placeholderSrc;
    var wrapperProps = __assign({}, props);
    delete wrapperProps.src;
    delete wrapperProps.placeholderSrc;
    delete wrapperProps.bgColor;
    delete wrapperProps.loadOnScreen;
    delete wrapperProps.blurAmount;
    var bgColor = props.bgColor || defaultBgColor;
    var blurAmount = props.blurAmount || defaultBlurAmount;
    return (React.createElement(react_deco_1.Bare, { constructor: constructor, didMount: function (cmp) { return didMount(cmp, props); }, willUnmount: willUnmount, render: function (cmp) {
            return React.createElement("div", __assign({}, wrapperProps, { "data-wrapper": true, style: __assign({}, wrapperStyle, wrapperProps.style), ref: function (ref) { return attachWrapperElRef(cmp, props, ref); } }),
                React.createElement(react_deco_1.If, { test: src && cmp.state.loaded, then: function () {
                        return React.createElement("img", { key: 'img', src: src, style: __assign({}, imgStyle, { opacity: 1 }) });
                    } }),
                React.createElement(react_deco_1.If, { test: placeholderSrc && cmp.state.placeholderLoaded, then: function () {
                        return React.createElement("img", { key: 'placeholder', src: placeholderSrc, style: __assign({}, imgPlaceholderStyle(blurAmount), { opacity: cmp.state.loaded ? 0 : 1 }) });
                    } }),
                React.createElement("div", { key: 'background', style: __assign({}, backgroundStyle, { backgroundColor: bgColor, opacity: (cmp.state.loaded || cmp.state.placeholderLoaded) ? 0 : 1 }) }),
                React.createElement("div", { key: 'preserver', style: { paddingBottom: '66.6%' } }));
        } }));
}
exports.Img = Img;
Img.propTypes = {
    src: PropsTypes.string.isRequired,
    placeholderSrc: PropsTypes.string,
    bgColor: PropsTypes.string,
    loadOnScreen: PropsTypes.bool,
    blurAmount: PropsTypes.string
};
function constructor(cmp) {
    cmp.state = {
        placeholderLoaded: false,
        loaded: false
    };
}
function beginImgLoad(cmp, props) {
    if (props.placeholderSrc) {
        loadImg(props.placeholderSrc, function () { return cmp.setState({ placeholderLoaded: true }); });
    }
    loadImg(props.src, function () { return cmp.setState({ loaded: true }); });
}
function attachWrapperElRef(cmp, props, ref) {
    if (ref) {
        cmp.domRef = ref;
        ref.onIntersection = function () { return beginImgLoad(cmp, props); };
    }
    else {
        cmp.domRef = null;
    }
}
function didMount(cmp, props) {
    if (props.loadOnScreen) {
        observer_1.observe(cmp.domRef);
    }
    else {
        beginImgLoad(cmp, props);
    }
}
function willUnmount(cmp) {
    cmp.observedElRef = null;
}
function loadImg(src, onLoad) {
    var img = new Image();
    img.onload = function () { return onLoad(src); };
    img.src = src;
}
//# sourceMappingURL=img.js.map