<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lucky extends Model {

    protected $table = 'lucky';

    protected $fillable = ['number'];

    protected $casts = [
        'id' => 'integer',
    ];


}
