<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Photos;
use App\Models\tmp_worker;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Mail;

class WorkerAddController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function add(Request $request)
    {
        $validator = validator()->make($request->all(), [
            'mail' => 'email|required',
            'manager_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Failed',
                'status' =>422
            ]);
        }
        $parametre = "";
        $email = $request->mail;
        $id = $request->manager_id;
        $dizi = explode("@", $email);
        for ($i = 0; $i <= strlen($dizi[0]) - 1; $i++) {
            if ($i % 2 == 0) {
                $parametre .= $dizi[0][$i];
            }
        }

        $tmpData = tmp_worker::where("url", $parametre)->get();

        if(count($tmpData) != 0){
            return response()->json([
                'message' => 'A request has already been made to add an employee!',
                'status' => 401
            ]);
        }

        $UserInfo = User::where("email", $request->mail)->get();

        if(count($UserInfo) != 0){
            if($UserInfo[0]->user_level == 2){
                return response()->json([
                    'message' => 'The user works at another company!',
                    'status' => 402
            ]);
        }else if($UserInfo[0]->user_level == 3)
        {
            $UserToStore = User::find($request->manager_id)->load("store");
            $storeID = $UserToStore->store[0]->id;
            $UserDat = User::where("email", $request->mail)->update(["store_id"=>$storeID,"user_level"=>2]);

            if($UserDat == 1)
            {
                $arr =[
                    "store" =>$UserToStore->store[0]->name
                ];

                Mail::send('mail.WorkerInformation', $arr, function ($messages) use ($email) {
                    $messages->to($email);
                    $messages->subject("Information");
                });
                return response()->json([
                    'message' => 'The person is now added as your employee',
                    'status' => 202
            ]);
            }
        }else if($UserInfo[0]->user_level ==1)
        {
            return response()->json([
                'message' => 'owner cannot be added as employee',
                'status' => 403
        ]);
        }
        }

            $veri = new tmp_worker([
                'url' => $parametre,
                'admin_id' => $id,
            ]);
            $veri->save();

            $data = User::find($request->manager_id)->load("store.Photos");

            $array = [
                'parametre' => $parametre,
                'date' => date("Y-m-d"),
                'patron' => $data->name,
                'store' => $data->store[0]->name,
            ];

            Mail::send('mail.WorkerAdd', $array, function ($messages) use ($email) {
                $messages->to($email);
                $messages->subject("Add Worker");
            });

            return response()->json([
                'message' => 'Send Mail Person',
                'status' => 201
            ]);
    }
}
