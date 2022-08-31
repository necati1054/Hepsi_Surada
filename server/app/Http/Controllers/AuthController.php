<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\tmp_worker;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\JWT;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }
    public function register(AuthRequest $request)
    {
        if($request->url){ //kullanıcı çalışan olarak kaydedilmek istenilirse
            $tmp = tmp_worker::where('url','=',$request->url)->first();

            if(!$tmp){
                return response()->json([
                    'message' => 'Hatalı Parametre'
                ]);
            }

            $manager = User::where('id','=',$tmp->admin_id)->first();

            $kişi = User::where('email','=',$request->email)->first();

            if(!$kişi){ //kullanııc yok ise
                $kişi = new User([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password')),
                    'store_id' => $manager->store_id,
                    'user_level' => '2',
                ]);
                $kişi->save();
            }

            $tmp->delete();

        }else{ //kullanıcı drekt kayıt oluyor ise
            return User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'user_level' => '3',
            ]);
        }
    }

    public function login(AuthRequest $request)
    {
        // $validator = validator()->make($request->all(),[
        //     'email' => 'email|required',
        //     'password' => 'string|required|min:8',
        // ]);

        // if($validator->fails()){
        //     return response()->json([
        //         'message' => 'Failed'
        //     ],422);
        // }

        $credentials = request(['email', 'password']);
        $user = User::select('id','name','email','user_level','store_id')->where('email',$request->input('email'))->get();

        if (! $token = auth()->claims(['user' => $user])->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }


        return  response()->json([
            'token' => $this->respondWithToken($token)->original
        ]);

        // ->withCookie(cookie('token',$this->respondWithToken($token)->original['access_token'],60))

    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function me(Request $request)
    {
        return response()->json(auth()->user());
    }

        /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' =>  config('jwt.ttl')
        ]);
    }

}
