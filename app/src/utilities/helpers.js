import moment from "moment/dist/moment";

export default {
    toInt(_val) {
        return parseInt(_val);
    },
    toFloat(_val){
        return parseFloat(_val)
    },
    deepCloneObj(_val){
        return JSON.parse(JSON.stringify(_val))
    },
    moveItemInArray(_array,_fromIndex,_toIndex){
        let element = _array[_fromIndex]
        _array.splice(_fromIndex,1)
        _array.splice(_toIndex,0,element)
    },
    isInt(_value){
        let x;
        if (isNaN(_value)) {
            return false;
        }
        x = parseFloat(_value);
        return (x | 0) === x;
    },
    isFloat(_value){
        return (!isNaN(_value) && _value.toString().indexOf('.') != -1)
    },
    exportObjectAsFile(content,fileName,contentType){
        let a = document.createElement("a");
        let file = new Blob([JSON.stringify(content)], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    },
    createDateTimePrefixedFileName(_filename){
        let sanitizedName = _filename.replaceAll(/[^a-z0-9+]+/gi, "_")
        return moment().format('YYYYMMDD_HHmmss') + '_' + sanitizedName;
    },
    sortArrayBySingleObjProperty(_array,_property,_direction){
        let arrayCopy = [..._array];
        if(_direction === 'ascending'){
            return arrayCopy.sort((a,b) => (a[_property] > b[_property]) ? 1 : -1)
        } else {
            return arrayCopy.sort((a,b) => (a[_property] < b[_property]) ? 1 : -1)
        }
    },
    filterArrayByObjPropertyValue(_array,_property,_value){
        let arrayCopy = [..._array];
        return arrayCopy.filter( (y)=> {return y[_property] === _value} );
    },
    camelKeyToWords(_value){
        let newText = _value.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
        return newText.charAt(0).toUpperCase() + newText.substr(1);
    },
    searchArrayByPropertyReturnKey(_array,_property,_value){
        let i, key = false;
        for (i = 0 && !key; i < _array.length; i++) {
            if(_array[i][_property] === _value) {
                key = i;
            }
        }
        return key;
    },
    toMoment(dateString,format){
        if (dateString.length === 14 && dateString.match(/^[0-9]+$/)) {
            return moment((new Date(dateString.substring(0, 4), dateString.substring(5, 6), dateString.substring(7, 8), dateString.substring(9, 10), dateString.substring(11, 12), dateString.substring(13, 14)))).format(format).replace('Invalid date', '');
        } else {
            return moment(dateString).format(format);
        }
    },
    toMomentFromNow(dateString){
        if (!dateString) return '';
        if (dateString.length === 14 && dateString.match(/^[0-9]+$/)) {
            return moment((new Date(dateString.substring(0, 4), dateString.substring(5, 6), dateString.substring(7, 8), dateString.substring(9, 10), dateString.substring(11, 12), dateString.substring(13, 14)))).zoneName('US/Pacific').fromNow();
        } else {
            return moment.utc(dateString).fromNow();
        }
    },
    toMomentLocal(dateString,format){
        if (!dateString || !dateString.length) return '';
        return moment(dateString).local().format(format);
    },
    setListItemsForPage: function(_list,_page,_perPage){
        let startPosition =  (_page - 1) * _perPage;
        let endPosition = (_page * _perPage);
        return _list.slice(startPosition,endPosition);
    },
    filterArrayByObjPropertyContainsValue(_array,_property,_value){
        let arrayCopy = [..._array];
        return arrayCopy.filter( (y)=> {
            let value = (y[_property]).toString();
            return value.includes(_value)
        } );
    },
    filterArrayByStringContainsValue(_array,_value){
        let arrayCopy = [..._array];
        return arrayCopy.filter( (y)=> {
            let value = (y).toString();
            return value.includes(_value)
        } );
    },
    filterArrayByAllObjectPropertiesContainingValue(_array,_allowedTypes,_value){
        let arrayCopy = [..._array];
        return arrayCopy.filter(o => {
            return Object.keys(o).some(k => {
                let propertyValue = o[k].toString();
                if(_allowedTypes.includes(typeof propertyValue)){
                    return propertyValue.toLowerCase().includes(_value.toLowerCase())
                }
            })
        })
    },
    highlightSearchMatch: function(_text,_search,_flags){
        if(!_search || _search === '') {
            return _text;
        } else if(!_text || _text === '') {
            return _text;
        } else {
            let flags;
            if(_flags) {
                flags = _flags;
            } else {
                flags = 'gi'
            }
            let string = _text.toString();
            let search = new RegExp(_search, flags);
            return string.replace(search, function(match){
                return '<span class="highlighted-match">' + match + '</span>'
            });
        }
    },
    isFullyFormedUrl: function(_text){
        let string = _text.toString();
        let search = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
        return search.test(string)

    },
    validContent: function(_contentArray,_contentString){
        return _contentArray.includes(_contentString);
    },
    queryPresent: function(_routerQueryObject){
        return Object.entries(_routerQueryObject).length > 0;
    },
    createRouterPush: function(_path,_query){
        return {
            path: _path,
            query: typeof _query !== 'undefined' ? _query : {}
        }
    }
}
