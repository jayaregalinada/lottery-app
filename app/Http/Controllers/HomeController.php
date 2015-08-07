<?php

namespace App\Http\Controllers;

use App\Lucky;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function index()
    {
        return view('index');
    }

    public function submit(Request $request)
    {
        try {
            $this->checkingUniqueness($request);
            $this->checkingRange($request);
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
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    protected function checkingUniqueness(Request $request)
    {
        if( count(array_unique($request->only(['a', 'b', 'c']))) < 3) {
            throw new \Exception('Every box must be unique. Try again?');
        }
    }

    protected function checkingRange(Request $request)
    {
        foreach ($request->only(['a', 'b', 'c']) as $key => $value) {
            if(!in_array($value, range(1, 49))) {
                throw new \Exception('Every box must be range from 1 to 49. Try again?');
            }
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
