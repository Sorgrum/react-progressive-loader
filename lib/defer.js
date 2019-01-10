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
var observedElStyle = {
    display: 'inline-block',
    minHeight: '1px',
    minWidth: '1px'
};
function Defer(props) {
    var observedDivElProps = __assign({ style: observedElStyle }, props);
    delete observedDivElProps.render;
    delete observedDivElProps.renderPlaceholder;
    delete observedDivElProps.loadOnScreen;
    return (React.createElement(react_deco_1.Bare, { constructor: constructor, didMount: function (cmp) { return didMount(cmp, props); }, willUnmount: willUnmount, render: function (cmp) {
            return React.createElement(react_deco_1.Switch, null,
                React.createElement(react_deco_1.When, { test: cmp.state.componentToRender, render: cmp.state.componentToRender }),
                React.createElement(react_deco_1.When, { test: true, render: function () {
                        return React.createElement("div", __assign({}, observedDivElProps, { "data-observed": true, ref: function (observedElRef) { return attachObservedElRef(cmp, observedElRef); } }),
                            React.createElement(react_deco_1.If, { test: cmp.state.loading, then: function () {
                                    return (loadComponent(cmp, props), props.renderPlaceholder && props.renderPlaceholder());
                                } }));
                    } }));
        } }));
}
exports.Defer = Defer;
Defer.propTypes = {
    render: PropsTypes.any.isRequired,
    renderPlaceholder: PropsTypes.any,
    loadOnScreen: PropsTypes.bool
};
function constructor(cmp) {
    cmp.state = {
        loading: false,
        componentToRender: false
    };
}
function didMount(cmp, props) {
    if (props.loadOnScreen) {
        observer_1.observe(cmp.observedElRef);
    }
    else {
        cmp.setState({ loading: true });
    }
}
function willUnmount(cmp) {
    cmp.observedElRef = null;
}
function attachObservedElRef(cmp, observedElRef) {
    if (observedElRef) {
        cmp.observedElRef = observedElRef;
        observedElRef.onIntersection = function () {
            cmp.setState({ loading: true });
        };
    }
    else {
        cmp.observedElRef = null;
    }
}
function loadComponent(cmp, props) {
    var result = props.render();
    if (result.then) {
        result.then(function (mod) {
            var cmpToRender;
            if (mod) {
                if (typeof mod === 'function') {
                    cmpToRender = mod;
                }
                else if (typeof mod.default === 'function') {
                    cmpToRender = mod.default;
                }
            }
            return cmp.setState({
                loading: false,
                componentToRender: cmpToRender
            });
        });
    }
    else {
        setTimeout(function () {
            cmp.setState({
                loading: false,
                componentToRender: result
            });
        }, 0);
    }
}
//# sourceMappingURL=defer.js.map