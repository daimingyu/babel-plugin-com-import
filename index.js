const types = require('babel-types');

//58React组件库
const COM_58_PC = 'com-58-pc';
//lodash
const LODASH = 'lodash';

/**
 * GSearchInput => g-search-input
 * GButton => g-button
 * @param {} params 
 */
function _castCompName(params) {
    let arr = params.split(/(?=[A-Z])/);
    let compName = '';
    for(let i=0; i<arr.length; i++){
        if(i === arr.length-1){
            compName += arr[i].toLocaleLowerCase()
        }else{
            compName += arr[i].toLocaleLowerCase() + '-';
        }
    }
    return compName;
}

/**
 * 数据类型判断
 * @param {} obj 
 */
function _type(obj){
    let type = typeof(obj);
    let string = Object.prototype.toString.call(obj);
    if(type == "object" || type == "function"){
        return string.split(" ")[1].slice(0,-1).toLowerCase();
    }else {
        return type; 
    }
}

/**
 * com-58-pc
 * @param {*} path 
 */
function _dealCom58Pc(path){
    path.replaceWithMultiple(path.node.specifiers.map((specifier) => (
        types.importDeclaration([types.ImportDefaultSpecifier(specifier.local)], types.stringLiteral(`com-58-pc/lib/${_castCompName(specifier.local.name)}/src`))
    )));
}

/**
 * lodash
 * @param {*} path 
 */
function _dealLodash(path){
    path.replaceWithMultiple(path.node.specifiers.map((specifier) => (
        types.importDeclaration([types.ImportDefaultSpecifier(specifier.local)], types.stringLiteral(`lodash/${specifier.local.name}`))
    )));
}

function _main() {
    return {
        visitor: {
            ImportDeclaration(path, ref = {}) {

                let { opts={} } = ref;

                //用户传过来的参数
                let library = opts.library;

                //判断参数类型
                let libType = _type(library);

                //参数类型是否为数组
                let isArray = libType === 'array';

                //参数类型是否为字符串
                let isString = libType === 'string';

                //待处理库的目标数组
                let targetArr = [];

                //如何library类型不符合预期就退出
                if(!isArray && !isString) return;

                //无论用户传过来的library是数组还是字符串都将其转化为数组处理
                isArray && targetArr.push.apply(targetArr,library);
                isString && targetArr.push(library);

                //代码中每个ImportDeclaration 的名称
                //例如 import { GButton } from 'com-58-pc'
                //nodeValue 值就为 com-58-pc
                //例如 import React from 'react'
                //nodeValue 值就为 react
                let nodeValue = path.node.source.value ;

                if(targetArr.indexOf(nodeValue) > -1){
                    switch(nodeValue){
                        case COM_58_PC:
                            _dealCom58Pc(path);
                            break;
                        case LODASH:
                            _dealLodash(path);
                            break;
                    }
                }
            }
        }
    };
}

module.exports = _main;