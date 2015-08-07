<?php

namespace App\Http\Controllers;

use App\Lucky;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Carbon\Carbon;

class HomeController extends Controller {

    /*
    |--------------------------------------------------------------------------
    | Home Controller
    |--------------------------------------------------------------------------
    |
    | This controller renders your application's "dashboard" for users that
    | are authenticated. Of course, you are free to change or remove the
    | controller as you wish. It is just here to get your app started!
    |
    */

    /**
     * Show the application dashboard to the user.
     *
     * @return Response
     */
    public function index()
    {
        return view('index');
    }

    public function submit(Request $request)
    {
        try {
            if( $request->get('lottery') === 'false' ) {
                $value = $this->generateNew();
            } else {
                $value = $this->generateByUser($request);
            }

            Lucky::create([
                'number' => implode(",", array_values( $value ))
            ]);

            return $value;

        } catch (QueryException $e) {
            $data = Lucky::whereNumber( implode(",", array_values( $request->only(['a', 'b', 'c']) )) )->first();
            return response([
                'error' => 'Oh! We already have this combination since '. $data->created_at->toDateTimeString() .'. Please Try again.',
                'data' => $data,
                'a' => $request->get('a'),
                'b' => $request->get('b'),
                'c' => $request->get('c'),
            ], 500);
        }
    }

    protected function generateNew()
    {
        $numbers = range(1, 49);
        shuffle($numbers);
        $numbers = array_slice($numbers, 0, 3);

        return [
            'a' => $numbers[0],
            'b' => $numbers[1],
            'c' => $numbers[2]
        ];
    }

    protected function generateByUser(Request $request)
    {
        return $request->only(['a', 'b', 'c']);
    }

    public function views($view)
    {
        return view('public/'. $view);
    }

}
