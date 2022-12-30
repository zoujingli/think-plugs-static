<?php

namespace think\admin;

class Index extends \think\admin\Controller
{
    public function index()
    {
        $this->redirect(sysuri('admin/login/index'));
    }
}
