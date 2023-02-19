// +----------------------------------------------------------------------
// | Static Plugin for ThinkAdmin
// +----------------------------------------------------------------------
// | 版权所有 2014~2023 Anyon <zoujingli@qq.com>
// +----------------------------------------------------------------------
// | 官方网站: https://thinkadmin.top
// +----------------------------------------------------------------------
// | 开源协议 ( https://mit-license.org )
// | 免责声明 ( https://thinkadmin.top/disclaimer )
// +----------------------------------------------------------------------
// | gitee 代码仓库：https://gitee.com/zoujingli/think-plugs-static
// | github 代码仓库：https://github.com/zoujingli/think-plugs-static
// +----------------------------------------------------------------------

define(function () {

    return function (form, callable, onConfirm) {
        var that = this;
        // 绑定表单元素
        this.form = $(form);
        // 检测表单元素
        this.tags = 'input,textarea';
        // 绑定元素事件,
        this.evts = 'blur keyup change';
        // 预设检测规则
        this.patterns = {
            phone: '^1[3-9][0-9]{9}$',
            email: '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'
        };
        // 检测属性是否有定义
        this.hasProp = function (ele, prop) {
            var attrProp = ele.getAttribute(prop);
            return typeof attrProp !== 'undefined' && attrProp !== null && attrProp !== false;
        };
        this.isRegex = function (ele) {
            var real = $.trim($(ele).val());
            var regexp = ele.getAttribute('pattern');
            regexp = this.patterns[regexp] || regexp;
            if (real === "" || !regexp) return true;
            return new RegExp(regexp, 'i').test(real);
        };
        this.checkAllInput = function () {
            var status = true;
            return this.form.find(this.tags).each(function () {
                that.checkInput(this) === false && status && (status = !$(this).focus());
            }) && status;
        };
        this.checkInput = function (ele) {
            if (this.hasProp(ele, 'data-auto-none')) return true;
            var type = (ele.getAttribute('type') || '').replace(/\W+/, '').toLowerCase();
            if ($.inArray(type, ['file', 'reset', 'image', 'radio', 'checkbox', 'submit', 'hidden']) > -1) return true;
            if (this.hasProp(ele, 'required') && $.trim($(ele).val()) === '') return this.remind(ele, 'required');
            return this.isRegex(ele) ? !!this.hideError(ele) : this.remind(ele, 'pattern');
        };
        this.remind = function (ele, type, message) {
            if (!$(ele).is(':visible')) return true;
            message = message || ele.getAttribute((type || 'pattern') + '-error');
            if (type === 'required') message = message || '内容不能为空';
            return this.showError(ele, message || ele.getAttribute('title') || ele.getAttribute('placeholder') || '输入格式错误') , false;
        };
        this.showError = function (ele, tip) {
            return this.insertError($(ele).addClass('validate-error')).addClass('layui-anim-fadein').css({width: 'auto'}).html(tip);
        };
        this.hideError = function (ele) {
            return this.insertError($(ele).removeClass('validate-error')).removeClass('layui-anim-fadein').css({width: '30px'}).html('');
        };
        this.insertError = function (ele) {
            if ($(ele).data('input-info')) return $(ele).data('input-info');
            var $html = $('<span class="absolute block layui-anim text-center font-s12 notselect" style="color:#A44;z-index:2"></span>');
            var $next = $(ele).nextAll('.input-right-icon'), right = ($next ? $next.width() + parseFloat($next.css('right') || '0') : 0) + 10;
            var style = {top: $(ele).position().top + 'px', right: right + 'px', lineHeight: ele.nodeName === 'TEXTAREA' ? '32px' : $(ele).css('height')};
            $(ele).data('input-info', $html.css(style).insertAfter(ele));
            return $html;
        };
        /*! 表单元素验证 */
        this.form.attr({onsubmit: 'return false', novalidate: 'novalidate', autocomplete: 'off'});
        this.form.off(this.evts, this.tags).on(this.evts, this.tags, function () {
            that.checkInput(this);
        }).data('validate', this).bind('submit', function (event) {
            event.button = that.form.find('button[type=submit],button:not([type=button])');
            /* 检查所有表单元素是否通过H5的规则验证 */
            if (that.checkAllInput() && typeof callable === 'function') {
                if (typeof CKEDITOR === 'object' && typeof CKEDITOR.instances === 'object') {
                    for (var i in CKEDITOR.instances) CKEDITOR.instances[i].updateElement();
                }
                /* 触发表单提交后，锁定三秒不能再次提交表单 */
                if (that.form.attr('submit-locked')) return false;
                onConfirm(event.button.attr('data-confirm'), function () {
                    that.form.attr('submit-locked', 1);
                    event.button.addClass('submit-button-loading');
                    callable.call(form, that.form.formToJson(), []);
                    setTimeout(function () {
                        that.form.removeAttr('submit-locked');
                        event.button.removeClass('submit-button-loading');
                    }, 3000);
                });
            }
            return event.preventDefault() && false;
        }).find('[data-form-loaded]').map(function () {
            $(this).html(this.dataset.formLoaded || this.innerHTML);
            $(this).removeAttr('data-form-loaded').removeClass('layui-disabled');
        });
    }
});