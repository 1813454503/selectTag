
class Selectbox{
    constructor(options){
        this.element=$(options.element);
        this.timer=null;
        this.url=options.url;
        this.init();
    }
    init(){
        let that=this;
        $('<input type="text" id="txt" placeholder="add tags">').appendTo(this.element);
        this.element.after('<ul id="list"></ul>');
        /**
         * description 设置焦点
         * */

        this.element.click(function () {
            $('#txt').focus();
        });
        
        /**
         * description 删除功能
         * */
        $('#txt').keydown(function (e) {
            if ($('#txt').val() == '' && e.keyCode == 8) {
                $('#list li').each(function(index,element){
                    if($(element).html()==$('#txt').prev().find('span').html()){
                        $(element).removeClass('selecton');
                        // console.log(element);
                    }
                });
                $('#txt').prev().remove();
            }
        });
        
        this.element.on('click', 'div a', function () {
            $(this).parent().remove();
        });

        /**
         * description 创建列表功能
         * */

        $('#txt').change(function () {
            clearTimeout(that.timer);
            that.timer = setTimeout(function () {
                let _data = $('#txt').val();
                let oUl = $('#list');
                that.getData(oUl);
            }, 200);
        });

        /**
         * desciption 创建tag标签功能
         * */
        $('#list').on('click', 'li', function () {
            if($(this).attr('class')!='selecton'){
                $('<div><span>' + $(this).html() + '</span><a href="javacript:;">X</a></div>').prependTo($('#box'));
                $('#txt').val('');
            }
            $(this).addClass('selecton');
        });
        
    };

    /**
     * description 创建list函数
     * */
    createList(data, obj) {
        obj.html('');
        for (var i = 0; i < data.length; i++) {
            $('<li>' + data[i].name + '</li>').appendTo(obj);
        }
    }

    /**
     * description 请求数据
     * */
    getData(obj) {
        let that=this;
        $.ajax({
            type: "POST",
            url: that.url,
            data: {},
            success: function (str) {
                var data = eval(str);
                that.createList(data, obj)
            },
            error: function () {
            }
        });
    }
}
