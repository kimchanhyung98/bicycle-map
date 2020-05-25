<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'views' => 0,
        'is_notice' => 0,
    ];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Defining Relationships
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Defining The Inverse Of The Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function file()
    {
        return $this->belongsTo(Files::class);
    }

    /**
     * Defining the scope to a given Eloquent query builder.
     */

    /**
     * 전체 게시글, 조회수 순
     *
     * @param Builder $query
     * @return Builder
     */
    public function scopePopular($query)
    {
        return $query->orderbyDesc('views');
    }
}
