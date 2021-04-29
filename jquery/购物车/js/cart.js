$(function () {
    //定义每件商品元素
    var item1 = $(`<tr class='item1'>
				<td><span class="iconfont first">&#xe60c;</span></td>
				<td class="clear">
					<img src="img/cart-product/1.jpg" class="fl">
					<div class="fl"><a href="#">时尚短袖</a>
						<p>尺寸：M</p>
						<p>颜色：黑色</p>
					</div>
				</td>
				<td class="unit_price">$238.56</td>
				<td>
					<span class="minus">-</span><input type="text" value="1" class="nums"><span class="plus">+</span>
				</td>
				<td class="total">$238.56</td>
				<td class="iconfont remove">&#xe667;</td>
			</tr>`)
    var item2 = $(`<tr class='item2'>
				<td><span class="iconfont first">&#xe60c;</span></td>
				<td class="clear">
					<img src="img/cart-product/2.jpg" class="fl">
					<div class="fl"><a href="#">长裙</a>
						<p>尺寸：M</p>
						<p>颜色：深蓝</p>
					</div>
				</td>
				<td class="unit_price">$156.64</td>
				<td>
					<span class="minus">-</span><input type="text" value="1" class="nums"><span class="plus">+</span>
				</td>
				<td class="total">$156.64</td>
				<td class="iconfont remove">&#xe667;</td>
			</tr>`)
    var item3 = $(`<tr class='item3'>
				<td><span class="iconfont first">&#xe60c;</span></td>
				<td class="clear">
					<img src="img/cart-product/3.jpg" class="fl">
					<div class="fl"><a href="#">睡裙</a>
						<p>尺寸：M</p>
						<p>颜色：白色</p>
					</div>
				</td>
				<td class="unit_price">$98.12</td>
				<td>
					<span class="minus">-</span><input type="text" value="1" class="nums"><span class="plus">+</span>
				</td>
				<td class="total">$98.12</td>
				<td class="iconfont remove">&#xe667;</td>
			</tr>`)
    //页面加载完成则计算商品总件数和价格
    getitems()
    //创建商品数组，包含每个商品对象
    var items = [{ item: item1, flag: false, itemname: 'item1' },
    { item: item2, flag: false, itemname: 'item2' },
    { item: item3, flag: false, itemname: 'item3' }]
    //是否全选
    $('.all').on('click', function () {
        //如果全选选上，所有商品选上
        if ($(this).hasClass('choice')) {
            $('.all').html('&#xe60c;全选').removeClass('choice')
            $('.first').removeClass('choice').html('&#xe60c;')
            $('.first').parents('tr').removeClass('has_choiced')
        } else {
            $('.all').text('取消全选').addClass('choice')
            $('.first').empty().addClass('choice')

            $('.first').parents('tr').addClass('has_choiced')
        }
        //计算商品总件数和价格
        getitems()
    })
    //点击选中或取消选中商品
    $('table').on('click', '.first', function () {
        //如果已经选中则取消否则选中
        if ($(this).hasClass('choice')) {
            $(this).removeClass('choice').html('&#xe60c;')
            $(this).parents('tr').removeClass('has_choiced')

        } else {
            $(this).empty().addClass('choice')
            $(this).parents('tr').addClass('has_choiced')
        }
        //每次点击判断已选商品数量是否等于购物车中商品的数量。如果是则让全选状态选上，否则取消全选
        if ($('.first.choice').length == $('.first').length) {
            $('.all').text('取消全选').addClass('choice')
            $('.first').parents('tr').addClass('has_choiced')
        } else {
            $('.all').html('&#xe60c;全选').removeClass('choice')

        }
        //计算商品总件数和价格
        getitems()
    })
    //点击一次增加对应商品数量一件
    $('table').on('click', '.plus', function () {

        var val = $(this).siblings('.nums').val();
        //商品数量加一
        val++;
        $(this).siblings('.nums').val(val)
        //获取对应商品单价
        var price = $(this).parent().siblings('.unit_price').html();
        price = price.substr(1)
        //计算该商品总价格
        price = (price * val).toFixed(2)
        $(this).parent().siblings('.total').html('$' + price);
        //计算商品总件数和价格
        getitems()
    })
    //点击一次减少对应商品数量一件
    $('table').on('click', '.minus', function () {

        var val = $(this).siblings('.nums').val();
        //如果数量为1则不能再减少
        if (val == 1) {
            return false
        }
        //商品数量减一
        val--;
        $(this).siblings('.nums').val(val);
        //获取对应商品单价
        var price = $(this).parent().siblings('.unit_price').html();
        price = price.substr(1)
        //计算该商品总价格
        price = (price * val).toFixed(2)
        $(this).parent().siblings('.total').html('$' + price);
        //计算商品总件数和价格
        getitems()
    })
    $('table').on('change', '.nums', function () {
        var val = $(this).val();
        var price = $(this).parent().siblings('.unit_price').html();
        price = price.substr(1)
        price = (price * val).toFixed(2)
        $(this).parent().siblings('.total').html('$' + price);

    })
    //删除点击的商品
    $('table').on('click', '.remove', function () {

        //重置该商品的信息
        $(this).parent().removeClass('has_choiced');
        var itemname = $(this).parent().prop('class');
        $(this).siblings().eq(0).children('.first').removeClass('choice').html('&#xe60c;');
        $(this).siblings().eq(3).children('.nums').val(1)
        var price = $(this).siblings('.unit_price').html();
        $(this).siblings('.total').html(price)

        $.each(items, function (i, ele) { //让该商品信息的flag为false表示未添加至购物车
            if (ele.itemname == itemname) {
                ele.flag = false
            }

        })
        //删除该商品
        $(this).parent().remove()
        //每次删除判断已选商品数量是否等于购物车中商品的数量。如果是则让全选状态选上，否则取消全选
        if (($('.first.choice').length == $('.first').length) && ($('.first').length !== 0)) {
            $('.all').text('取消全选').addClass('choice')
        } else {
            $('.all').html('&#xe60c;全选').removeClass('choice')
        }
        //计算商品总件数和价格
        getitems()
    })
    //删除所有商品不管是否已选择
    $('.remove_all').on('click', function () {
        //让所有商品信息重置
        $('.first').removeClass('choice').html('&#xe60c;')
        $('.first').parents('tr').removeClass('has_choiced')
        $('.all').html('&#xe60c;全选').removeClass('choice')
        $('.nums').val(1);

        //回复每个商品的总价格为单价
        $('.total').each(function (i, ele) {
            var price = $(ele).siblings('.unit_price').html()
            $(ele).html(price)
        })
        //让所有商品的flag为false表示未加入购物车
        $.each(items, function (i, ele) {

            ele.flag = false
        })
        //删除所有商品
        $('.first').parents('tr').remove()
        //计算商品总件数和价格
        getitems()
    })
    //删除已选商品
    $('.remove_choiced').on('click', function () {
        //对商品栏目进行遍历
        $.each(items, function (i, ele) {
            //重置已选商品的总价格为单价和商品数量并让该商品的flag为false表示未加入购物车
            if ($(ele.item).find('.first').hasClass('choice')) {
                var price = $(ele.item).find('.unit_price').html()
                $(ele.item).find('.total').html(price)
                $(ele.item).find('.nums').val(1)

                ele.flag = false
            }

        })
        //删除已选商品的打勾和背景
        $('.first.choice').removeClass('choice').html('&#xe60c;').parents('tr').removeClass('has_choiced').remove()
        //删除后判断购物车中是否还有商品，剩下的商品一定是未选中的，所以如果有商品则让全选取消。
        if ($('.first').length == 0) {
            $('.all').html('&#xe60c;全选').removeClass('choice')
        }
        //计算商品总件数和价格
        getitems()
    })
    //添加商品
    $('.add_item').on('click', function () {
        var i = $(this).index('.add_item');
        //如果flag标记为true则代表已添加
        if (items[i].flag == true) {
            return alert('该商品已经添加至购物车，请不要重复添加')
        }
        //将商品添加至购物车中
        $('.last').before(items[i].item);
        //添加商品后该商品用flag标记已添加
        items[i].flag = true;
        //每添加一件商品，因为商品默认未选中所以取消全选
        $('.all').html('&#xe60c;全选').removeClass('choice')

    })
    //计算商品总件数和价格，删除、选中和修改商品数量时操作都需要调用
    function getitems() {
        var count = 0;
        var money = 0;
        $('.nums').each(function (i, ele) {

            if ($(ele).parent().siblings().eq(0).children('.first').hasClass('choice')) {
                count += parseInt($(ele).val())
            }

        })

        $('.items_num').html(count + '件')
        $('.total').each(function (i, ele) {

            if ($(ele).siblings().eq(0).children('.first').hasClass('choice')) {
                money += parseFloat($(ele).html().substr(1))
            }

        })
        $('.money').html('$' + money.toFixed(2))
    }
    //选择页面
    $('.choose_cart').on('click','div',function(){
        $(this).parent().siblings().removeClass('choose')
        $('.cart').show()
        $('.pay,.wait').hide()
    })
    $('.choose_pay').on('click','div',function(){
        $(this).parent().addClass('choose')
        $(this).parent().next().removeClass('choose')
        //获取总价格并显示在结算页面中
        $('.pay_money span').html($('.money').eq(1).html())
        $('.pay').show()
        $('.cart,.wait').hide()
    })
    $('.choose_wait').on('click','div',function(){
        $(this).parent().addClass('choose').siblings().addClass('choose')
        $('.wait').show()
        $('.cart,.pay').hide()
    })
})
