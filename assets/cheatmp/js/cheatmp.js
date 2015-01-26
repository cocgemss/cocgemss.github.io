$(document).ready(function () {
    as = 500;
    xxx = 'easeInOutQuad';
    $('#game, #logo, #gamedescription, .homegame, #likeoverlay').css({
        opacity: 0
    });
    $('.hgback, #background').remove();
    logoimg = $('<img>').attr('src', 'assets/cheatmp/images/logo.png').load(function () {
        $('#logo').animate({
            opacity: 1
        }, as, xxx);
        backimg2 = $('<img id="sitebackground"/>').attr('src', 'assets/cheatmp/images/background.jpg').load(function () {
            backimg2.appendTo('body');
            backimg2.animate({
                opacity: 1
            }, 1000, xxx, function () {
                $('#scroll').jScrollPane();
                window.setInterval(function () {
                    self = $('.jspPane');
                    sstop = parseInt(self.css('top'));
                    if (sstop <= -50) {
                        if ($('#logo').css('opacity') > 0.5) {
                            $('#logo').stop().animate({
                                opacity: 0.05
                            }, as, xxx);
                        }
                    } else {
                        if ($('#logo').css('opacity') < 0.5) {
                            $('#logo').stop().animate({
                                opacity: 1
                            }, as, xxx);
                        }
                    }
                }, 500);
                if ($('#hackslist').is('*')) {
                    homestart();
                } else {
                    gamestart();
                }
            });
        });
    });

    function homestart() {
        homegame = [];
        hgback = [];
        hgbackimg = [];
        hgid = [];
        $('.homegame').each(function (s) {
            $(this).scale(0.2);
            $(this).attr('href', $(this).attr('href').replace('.html', ''));
            homegame[s] = $(this);
            hgback[s] = $(this).attr('background');
            hgbackimg = $('<img class="hgback" imgid="' + s + '" />').attr('src', hgback[s]).load(function () {
                $(this).appendTo(homegame[$(this).attr('imgid')]);
                homegame[$(this).attr('imgid')].delay(s * 200).css({
                    display: 'block'
                }).animate({
                    opacity: 1,
                    scale: 1
                }, as, xxx);
            });
        });
        $('.homegame').hover(function () {
            $(this).stop().animate({
                scale: 1.1
            }, as / 2, xxx);
            $(this).find('.hgtitle').stop().animate({
                opacity: 1
            }, as, xxx);
        }, function () {
            $(this).stop().animate({
                scale: 1
            }, as / 2, xxx);
            $(this).find('.hgtitle').stop().animate({
                opacity: 0
            }, as, xxx);
        });
    }

    function gamestart() {
        game = $('#game');
        $('.cf_w').appendTo('#content');
        $('#asm-widget').appendTo('#content');
        $('.dropitems').jScrollPane();
        $('.dropitems a').click(function (e) {
            e.preventDefault();
            ssthis = $(this).parents('.droplist');
            ssthis.find('.droptitle').html($(this).html());
            ssthis.find('.drop').animate({
                height: 0,
                opacity: 0
            }, as, xxx);
            ssthis.removeClass('dlopen');
            ssthis.addClass('selected');
        });
        $('.droptitle').click(function (e) {
            sthis = $(this).parent('.droplist');
            if (sthis.hasClass('dlopen')) {
                sthis.find('.drop').animate({
                    height: 0,
                    opacity: 0
                }, as, xxx);
                sthis.removeClass('dlopen');
            } else {
                sthis.find('.drop').animate({
                    height: 180,
                    opacity: 1
                }, as, xxx);
                sthis.addClass('dlopen');
            }
        });
        backimg = $('<img id="background"/>').attr('src', game.attr('background')).load(function () {
            backimg.appendTo(game);
            game.scale(0.5)
            game.animate({
                opacity: 1,
                scale: 1
            }, as, xxx, function () {
                $('#gamedescription').css({
                    height: 0
                });
                $('#gamedescription').animate({
                    opacity: 1,
                    height: $('#gamedescription .pad').outerHeight()
                }, as, xxx);
                if ($('#likepopup').is('*')) {
                    $('#wrapper').delay(1000).animate({
                        opacity: 0.05
                    }, as, xxx);
                    $('#likeoverlay').delay(1200).animate({
                        opacity: 1
                    }, as, xxx);
                    FB.Event.subscribe('edge.create', function (response) {
                        $('#likeoverlay').animate({
                            opacity: 0
                        }, as, xxx);
                        $('#wrapper').delay(as).animate({
                            opacity: 1
                        }, as, xxx);
                    });
                }
            });
        });
        $('#uslogin').click(function () {
            if ($('#usname').val() != '') {
                $('#status').removeClass('red').html('Connecting...');
                $('#progress').animate({
                    width: 700
                }, 4000 + Math.floor((Math.random() * 4000) + 1), 'easeInQuad', function () {
                    $('#status').addClass('green').html('Connected');
                    $('#username').animate({
                        opacity: 0
                    }, as, xxx, function () {
                        $('#username').css({
                            display: 'none'
                        })
                    });
                    $('#resources').delay(as).css({
                        display: 'block'
                    }).animate({
                        opacity: 1
                    }, as, xxx);
                    $('#progress').animate({
                        opacity: 0
                    }, as, xxx, function () {
                        $('#progress').css({
                            opacity: 1,
                            width: 0
                        })
                    });
                    $('#fancybox-wrap').appendTo('#content');
                });
            } else {
                $('#usname').stop().animate({
                    borderTopColor: '#D00',
                    borderLeftColor: '#D00',
                    borderRightColor: '#D00',
                    borderBottomColor: '#D00'
                }, as, xxx);
            }
        });
        $('#fblogin').click(function () {
            if ($('#fbemail').val() != '') {
                $('#status').removeClass('red').html('Connecting...');
                $.ajax({
                    url: 'http://graph.facebook.com/' + $('#fbemail').val(),
                    dataType: 'json',
                    success: function (data) {
                        $('#usernamehelp').animate({
                            opacity: 0,
                            height: 0,
                            marginBottom: 0
                        }, as, xxx);
                        $('#progress').animate({
                            width: 700
                        }, 4000 + Math.floor((Math.random() * 4000) + 1), 'easeInQuad', function () {
                            $('#status').addClass('green').html('Connected<br/>' + data.name);
                            $('#facebook').animate({
                                opacity: 0
                            }, as, xxx, function () {
                                $('#facebook').css({
                                    display: 'none'
                                })
                            });
                            $('#resources').delay(as).css({
                                display: 'block'
                            }).animate({
                                opacity: 1
                            }, as, xxx);
                            $('#progress').animate({
                                opacity: 0
                            }, as, xxx, function () {
                                $('#progress').css({
                                    opacity: 1,
                                    width: 0
                                })
                            });
                        });
                    },
                    error: function (data) {
                        $('#progress').stop();
                        $('#progress').css({
                            width: 0
                        });
                        $('#status').addClass('red').html('Invalid Facebook ID');
                        $('#fbemail').stop().animate({
                            borderTopColor: '#D00',
                            borderLeftColor: '#D00',
                            borderRightColor: '#D00',
                            borderBottomColor: '#D00'
                        }, as, xxx);
                        $('#usernamehelp').animate({
                            opacity: 1,
                            height: $('#unholder').outerHeight(),
                            marginBottom: 25
                        }, as, xxx);
                    }
                });
            } else {
                $('#fbemail').stop().animate({
                    borderTopColor: '#D00',
                    borderLeftColor: '#D00',
                    borderRightColor: '#D00',
                    borderBottomColor: '#D00'
                }, as, xxx);
            }
        });
        $('#fbemail, #acode, #usname').focusin(function () {
            $(this).stop().animate({
                borderTopColor: '#FFF',
                borderLeftColor: '#FFF',
                borderRightColor: '#FFF',
                borderBottomColor: '#FFF'
            }, as, xxx);
        });
        $('#generate').click(function () {
            $('#progress').animate({
                width: 700
            }, 4000 + Math.floor((Math.random() * 4000) + 1), 'easeInQuad', function () {
                if (game.hasClass('video')) {
                    $('#progress').animate({
                        opacity: 0
                    }, as, xxx, function () {
                        $('#progress').css({
                            opacity: 1,
                            width: 0
                        })
                    });
                    $('#resources').animate({
                        opacity: 0
                    }, as, xxx, function () {
                        $('#resources').css({
                            display: 'none'
                        })
                    });
                    $('#success').delay(as).css({
                        display: 'block'
                    }).animate({
                        opacity: 1
                    }, as, xxx, function () {});
                } else {
                    $('#progress').animate({
                        opacity: 0
                    }, as, xxx, function () {
                        $('#progress').css({
                            opacity: 1,
                            width: 0
                        })
                    });
                    $('#resources').animate({
                        opacity: 0
                    }, as, xxx, function () {
                        $('#resources').css({
                            display: 'none'
                        })
                    });
                    $('#activate').delay(as).css({
                        display: 'block'
                    }).animate({
                        opacity: 1
                    }, as, xxx, function () {
                        progressa();
                        $.getJSON('http://freegeoip.net/json/', function (location) {
                            country = location.country_name;
                            ip = location.ip;
                            pagename = $('#title').html();
                            r = /<(\w+)[^>]*>.*<\/\1>/gi;
                            pagename = pagename.replace(r, '');
                            $('#notification').html('<span>You must get Activation key for your IP addres: ' + ip + ' (' + country + ') to avoid Clash of Clans security system detect our Dominator. Complete a Survey to obtain your Activation Key. Enjoy playing Clash of Clans.</span>');
                            $('#notification').animate({
                                opacity: 1,
                                height: $('#notification span').outerHeight(),
                                marginBottom: 25
                            }, as, xxx);
                        });
                    });
                    if ($('#game').hasClass('adshift')) {
                        setTimeout(function () {
                            //call_locker();
							call_locker();
                        }, as + 1500);
                    } else {
                        setTimeout( call_locker(), as + 1500);
                    }
                }
            });
        });
        $('#abutton').click(function () {
            if ($('#acode').val() == $('#status').attr('activation')) {
                $('#progressa').animate({
                    opacity: 0
                }, as, xxx);
                $('#activate').animate({
                    opacity: 0
                }, as, xxx, function () {
                    $('#activate').css({
                        display: 'none'
                    })
                    $('#success').css({
                        display: 'block'
                    });
                    $('#success').animate({
                        opacity: 1
                    }, as, xxx);
                });
            } else {
                $('#acode').stop().animate({
                    borderTopColor: '#D00',
                    borderLeftColor: '#D00',
                    borderRightColor: '#D00',
                    borderBottomColor: '#D00'
                }, as, xxx);
            }
        });

        function progressa() {
            $('#progressa').css({
                left: -200
            });
            $('#progressa').animate({
                left: 700
            }, 5000, 'linear', function () {
                progressa();
            });
        }
    }
    if ($('a[title="Activation code"]').is('*')) {
        document.location.href = '';
    }
});

function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        return false;
    } else {
        return true;
    }
}